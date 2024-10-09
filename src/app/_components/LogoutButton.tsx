export default function LogoutButton() {
  return (
    <form action="/auth/signout" method="post">
      <button className="px-4 py-2">로그아웃</button>
    </form>
  );
}

// "use client";

// import { createClient } from "@/utils/supabase/client";
// import { useRouter } from "next/navigation";

// export default function LogoutButton() {
//   const supabase = createClient();
//   const router = useRouter();

//   const handleLogout = async () => {
//     const error = await supabase.auth.signOut();
//     if (error) console.error("logout error");
//     router.refresh();
//   };

//   return <button onClick={handleLogout}>로그아웃</button>;
// }