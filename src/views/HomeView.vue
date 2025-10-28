<template>
  <div class="home">
    <div class="device-container">
      <div class="title-container">
        <h1>상품 목록</h1>
      </div>
      <div class="category-container" v-if="topCategoryRef">
        <ul>
          <li v-for="(item, index) in topCategoryRef" :key="index">
            <input
              type="radio"
              name="top-category"
              :id="`top-category-${item.categoryId}`"
              :value="item.categoryId"
              v-model="selectedTopCategory"
              style="display: none"
              @change="changeTopCategory"
            />
            <label :for="`top-category-${item.categoryId}`">{{
              item.categoryName
            }}</label>
          </li>
        </ul>
        <ul>
          <li v-for="(item, index) in bottomCategoryRef" :key="index">
            <input
              type="radio"
              name="bottom-category"
              :id="`bottom-category-${item.categoryId}`"
              :value="item.categoryId"
              v-model="selectedBottomCategory"
              style="display: none"
              @change="changeBottomCategory"
            />
            <label :for="`bottom-category-${item.categoryId}`">{{
              item.categoryName
            }}</label>
          </li>
        </ul>
      </div>
      <div class="product-list-container">
        <div
          class="product-item"
          v-for="(item, index) in productRef"
          :key="index"
          @click="handleClickProduct(item)"
        >
          <div class="product-item-card">
            <img :src="item.productThumbnailUrl.originalUrl" />
            <div class="desc-container">
              <p class="product-name">{{ item.productName }}</p>
              <div class="price-container">
                <p class="price">
                  <span>계좌이체가</span
                  >{{ (item.productSellPrice * 0.95).toLocaleString() }}원
                </p>
                <p class="price">
                  <span>카드결제가</span
                  >{{ item.productSellPrice.toLocaleString() }}원
                </p>
              </div>
            </div>
          </div>
          <!-- <hr v-if="index !== productRef.length - 1" /> -->
        </div>
      </div>
    </div>
    <div class="mid-container">
      <div class="option-container">
        <div class="title-container">
          <h1>옵션 선택</h1>
        </div>
        <div class="option-list-container">
          <div
            class="option-item"
            v-for="(item, index) in optionRef"
            :key="index"
          >
            <p>{{ item.optionName.split("/").pop() }}</p>
          </div>
        </div>
      </div>
      <div class="promotion-container">
        <div class="title-container">
          <h1>프로모션 선택</h1>
        </div>
      </div>
    </div>
    <div class="price-container">
      <div class="title-container">
        <h1>견적 내용</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  width: 100vw;
  height: 100vh;

  > div {
    flex: 1;
    overflow: hidden;
  }

  > .device-container {
    display: flex;
    flex-direction: column;
    border-right: 2px solid #ff55b3;
    > .category-container {
      > ul {
        display: flex;
        list-style: none;
        gap: 16px;
        padding: 12px 24px;
        border-bottom: 1px solid #666;
        scroll-behavior: smooth;
        white-space: nowrap;
        overflow: scroll;
        width: 100%;
        > li {
          > label {
            font-size: 24px;
          }

          > input:checked + label {
            font-weight: 700;
            color: #ff55b3;
            text-decoration: underline;
          }
        }
      }
    }
    > .product-list-container {
      flex: 1;
      overflow: scroll;

      > .product-item {
        padding: 8px;
        > .product-item-card {
          padding: 8px;
          background-color: #eee;
          border-radius: 8px;
          display: flex;
          gap: 16px;
          > img {
            width: 128px;
            aspect-ratio: 1 / 1;
            border-radius: 8px;
          }

          > .desc-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: start;
            width: 100%;
            > .product-name {
              font-size: 20px;
              word-break: keep-all;
              font-weight: 700;
              margin-bottom: 8px;
            }

            > .price-container {
              > .price {
                text-align: end;
                font-size: 20px;
                font-weight: 900;

                > span {
                  color: #ff55b3;
                  font-weight: 700;
                  margin-right: 8px;
                }
              }
            }
          }
        }

        > hr {
          margin: 16px 0;
        }
      }
    }
  }

  > .mid-container {
    display: flex;
    flex-direction: column;
    border-right: 2px solid #ff55b3;

    > div {
      flex: 1;
      min-height: 0;
    }

    > .option-container {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      > .option-list-container {
        display: flex;
        flex-wrap: wrap; /* 줄 바꿈 허용 */
        gap: 16px;
        padding: 16px;
        flex: 1;
        min-height: 0;
        overflow-y: auto; /* 세로 스크롤만 */

        > .option-item {
          flex: 0 0 calc((100% - 32px) / 3); /* 3열 고정 */
          aspect-ratio: 1 / 1 !important;
          border-radius: 8px;
          background-color: #eee;
          display: flex;
          justify-content: center;
          align-items: center;

          > p {
            text-align: center;
            font-size: 20px;
            font-weight: 500;
            word-break: keep-all;
          }
        }
      }
    }
  }

  > .price-container {
    display: flex;
    flex-direction: column;

    > .list-container {
    }
  }
}

.title-container {
  background-color: black;
  padding: 8px 24px;
  > h1 {
    text-align: start;
    color: white;
  }
}
</style>

<script setup>
import { db } from "@/lib/FirebaseLib";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { onMounted, ref } from "vue";

const topCategoryRef = ref(null);
const bottomCategoryRef = ref(null);
const productRef = ref(null);
const optionRef = ref(null);

const selectedTopCategory = ref("43");
const selectedBottomCategory = ref("44");
const selectedProduct = ref(null);

async function handleClickProduct(item) {
  selectedProduct.value = item;
  optionRef.value = selectedProduct.value.optionList;
}

async function changeTopCategory() {
  selectedBottomCategory.value = null;
  await getBottomCategory();
  await getProducts();
}

async function changeBottomCategory() {
  await getProducts();
}

async function getTopCategory() {
  try {
    const topCategoryQuery = query(
      collection(db, "category"),
      where("categoryGrade", "==", 0),
      where("categoryId", "!=", "1"),
      orderBy("categoryOrder", "asc")
    );
    const topCategoryQuerySnapshot = await getDocs(topCategoryQuery);
    topCategoryRef.value = topCategoryQuerySnapshot.docs.map((doc) => {
      return doc.data();
    });
  } catch (e) {
    console.error(e);
  }
}

async function getBottomCategory() {
  try {
    const bottomCategoryQuery = query(
      collection(db, "category"),
      where("categoryParentId", "==", selectedTopCategory.value),
      orderBy("categoryOrder", "asc")
    );
    const bottomCategoryQuerySnapshot = await getDocs(bottomCategoryQuery);
    bottomCategoryRef.value = bottomCategoryQuerySnapshot.docs.map((doc) => {
      return doc.data();
    });
  } catch (e) {
    console.error(e);
  }
}

async function getProducts() {
  try {
    const productQuery = query(
      collection(db, "product"),
      where("isActive", "==", true),
      where("productCategory", "array-contains-any", [
        selectedBottomCategory.value
          ? selectedBottomCategory.value
          : selectedTopCategory.value,
      ]),
      orderBy("createdAt", "desc")
    );
    const productQuerySnapshot = await getDocs(productQuery);
    productRef.value = productQuerySnapshot.docs.map((doc) => {
      return doc.data();
    });
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  try {
    // top category
    await getTopCategory();
    // bottom category
    await getBottomCategory();
    // product
    await getProducts();
  } catch (e) {
    console.error(e);
  }
});
</script>
