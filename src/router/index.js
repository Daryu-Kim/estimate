import { createRouter, createWebHistory } from "vue-router";
import { getDocs, query, collection, where } from "firebase/firestore";
import { auth, db } from "@/lib/FirebaseLib";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuthAdmin)) {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe(); // Unsubscribe the listener immediately after getting the result
      if (user) {
        try {
          const userDocs = await getDocs(
            query(
              collection(db, "managers"),
              where("uid", "==", user.uid),
              where("role", "==", "admin")
            )
          );
          if (userDocs.size > 0) {
            next();
          } else {
            console.warn(`No document found for user ID: ${user.uid}`);
            alert("관리자만 접근할 수 있습니다.");
            next({ path: "/" });
          }
        } catch (error) {
          alert("관리자만 접근할 수 있습니다.");
          next({ path: "/" });
        }
      } else {
        alert("관리자 로그인 후 이용가능합니다.");
        next({ path: "/login" });
      }
    });
  } else {
    next();
  }
});

export default router;
