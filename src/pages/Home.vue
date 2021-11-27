<script setup>
import { computed, reactive, ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { useQuasar } from 'quasar';
import Home from '../components/Home.vue';
import wares from "../storage/wares.json"
import UserShoppingCart from '../components/UserShoppingCart.vue';
const $q=useQuasar()
const currentCountry=ref({})
// const count=ref(0)
const shoppingCart=reactive([])
const userBalance=ref(0)
const shoppingCartModel=ref(false)
watch(shoppingCartModel,(to,from)=>{
  if(to==true){
  for(let [index,value] of shoppingCart.entries()){
    value.index=index+1
  }
  }
})
// watch(count,(to,from)=>to>=1 ? cardCase.value=true : cardCase.value=false)
const updateCurrentCountry=(val)=>{
  currentCountry.value=val;
  userBalance.value=Math.ceil(val.meanIncome/12);
  shoppingCart.length=0
}
const fixUserBalance=computed(()=>{
if( !Number.isInteger(userBalance.value) && String(userBalance.value).split(".")[1].length>2) return userBalance.value.toFixed(2)
else return userBalance.value
})
const isAdded=id=>shoppingCart.some((item)=>item.id===id)
const countryControl=()=>{
  if(currentCountry.value.country!=undefined) return true
        $q.notify({
          type: 'warning',
          message: 'first you must choose a country'
        })
   return false }
const wareCount=(id)=>{
    if(!isAdded(id)) return 0
    else return shoppingCart.find(item=>item.id==id).count
  }
const addWare=(ware)=>{
  if(!countryControl()) return
  else if(userBalance.value<ware.price) $q.notify({
          type: 'warning',
          message: "your balance isn't enougt to buy that ware"
  })
  else if(shoppingCart.length!=0  && isAdded(ware.id)){
     const index=shoppingCart.findIndex(item=>item.id==ware.id)
     userBalance.value-=ware.price;
     shoppingCart[index].count+=1
  }
 else  {
   userBalance.value-=ware.price;
   shoppingCart.push({...ware,count:1})}
}
const removeWare=(id)=>{
  if(!countryControl()) return
  else if(!isAdded(id)) console.log("this ware didn't include to shopping card yet")
  else{
     const currentWare=shoppingCart.find(item=>item.id==id)
   currentWare.count>1 ? currentWare.count-=1 : shoppingCart.splice(shoppingCart.findIndex(item=>item.id==id),1) ;
     userBalance.value+=currentWare.price;
     }
}

</script>
<template>
<q-page>
  <home  @update:current-country="updateCurrentCountry"></home>
 <transition-group name="header-transition">
      <section v-if="currentCountry.country== undefined" class="fixed-top row justify-between q-ma-sm  text-h6 text-dark" style="z-index:9999;" :key="1">
            <span id="brand" style="font-family: 'Metal Mania', cursive;">mDestiny</span>
    </section>
  <section v-else  id="user-wallet-section" class="fixed-top row justify-between items-center text-grey-2 rounded-borders bg-accent text-h6 q-pa-sm  q-mt-sm on-left on-right" style="z-index:1;font-family: 'Metal Mania', cursive;;" :key="2">
    <span  >{{currentCountry.country}}
      <q-tooltip    class="bg-accent text-white text-center   text-weight-medium" style="width:135px;">Popolation : {{String(currentCountry.pop2021).substr(0,currentCountry.pop2021.length-1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}}</q-tooltip>
    </span>
    <span id="user-wallet" class="text-h4 text-bold" style="letter-spacing:2px;"> <span class="text-h6 text-grey-3">$</span> {{fixUserBalance}}</span>
    <q-btn flat icon="o_shopping_cart" @click="shoppingCartModel=true">
        <user-shopping-cart  v-model="shoppingCartModel" :shoppingCart="shoppingCart" ></user-shopping-cart>
      <q-badge v-show="shoppingCart.length>0"   floating  class="bg-white text-accent" :label="shoppingCart.length">
      </q-badge>
    </q-btn>
  </section>
 </transition-group>
  <div class="row justify-around q-my-md q-gutter-lg items-center">
    <q-card  class="text-center col-5  col-sm-3 col-md-2  no-shadow"  style="height:300px;"  v-for="ware in wares" :key="ware.id">
      <q-img class="q-pa-md q-my-sm "   :src="ware.target"  fit="contain" :style="`height:${$q.screen.gt.xs ? 140 : 100 }px;`"></q-img>
      <q-card-section class="">{{ware.description}}  </q-card-section> 
      <div> <span class="text-grey-7" style="font-size:12px;">$</span> <strong>{{ware.price}}</strong> </div>
      <q-card-actions  class="row justify-between on-left on-right q-pa-none q-my-sm  rounded-borders" :class="isAdded(ware.id)? 'text-white bg-green-14' : 'text-dark bg-green-2 '" >
              <q-btn flat label="-" v-if="isAdded(ware.id)" class="col-2" :ripple="{color:'red'}" @click="removeWare(ware.id)"></q-btn>
              <div   v-else class="col-2" ></div>
              <div class="col-row">{{ isAdded(ware.id)?  wareCount(ware.id) : 'Add'}}</div>
              <q-btn flat label="+" class="col-2 " :ripple="{color:'positive'}" @click="addWare(ware,$event)"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
  
</q-page>
</template>


<style lang="scss" scoped>
.header-transition-enter-active,.header-transition-leave-active{
  transition: all .6s;
}
.header-transition-enter-from,.header-transition-leave-to{
  transform:translateY(-100px);
  opacity: 0;
}
.header-transition-enter-to,.header-transition-leave-from{
  transform: translateY(0px);
  opacity: 1;
}

</style>
