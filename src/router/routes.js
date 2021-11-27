const routes = [
{
  path:"/",name:"MainLayout",component:()=>import("../layouts/MainLayout.vue"),children:[
    {
      path: "",
      name: "Hs",
      component:()=>import("../pages/Home.vue")
    }
  ]
}
  ];


  export default routes