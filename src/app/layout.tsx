import type { Metadata } from "next";
import "./globals.css";
import User from "../lib/Class/User";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /** getUser Example START */
  // let idx: number = 1;
  // const user = await User.getUser(idx);
  /** getUser Example END */

  /** getUsers Example START */
  // let wheres = [
  //   "u.idx in (1,2)"
  // ];
  // let orderby = [
  //   "u.idx DESC"
  // ]
  // let limit = [
  //   "0, 10"
  // ]
  // const users = await User.getUsers(wheres, orderby, limit);
  /** getUsers Example END */

  /** setUser UPDATE Example START  */
  // const params = {
  //   idx: 1,
  //   username: "test"
  // };
  // const setUserUpdate = await User.setUser(params);
  /** setUser UPDATE Example END  */

  /** setUser INSERT Example START  */
  // const params = {
  //   username: "신현승"
  // };
  // const setUserInsert = await User.setUser(params);
  /** setUser INSERT Example END  */
  
  // console.log(users);
  return (
    
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}