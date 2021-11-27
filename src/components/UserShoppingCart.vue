<script setup>
import { computed, ref } from '@vue/reactivity';
import { exportFile, useQuasar } from 'quasar';
import domtoimage from "dom-to-image"
import { onMounted } from '@vue/runtime-core';
const $q= useQuasar()

const props=defineProps({
    shoppingCart:{
        type:Object,
        required:true
    }
})




 const rows =props.shoppingCart
const columns = [
  {
    name: 'index',
    required: true,
    label: '#',
    align: 'left',
    field:row=>row.index,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    sortable: true,
  },
  {
    name: 'description',
    required: true,
    label: 'Ware',
    align: 'left',
    field:row=>row.description,
    format: val => `${val}`,
    sortable: true,
    headerClasses:"text-center"
  },{
    name: 'count',
    required: true,
    label: 'Count',
    align: 'center',
    field:"count",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    sortable: true,
  },{
    name: 'price',
    required: true,
    label: 'Total price',
    align: 'center',
    field:"price",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    sortable: true,
  }
]
const tableDownload=async(e)=>{
   var node = document.getElementById("card")
domtoimage.toBlob(node, { quality: 1 })
    .then(function (blob) {
       const status= exportFile("as.jpg",blob)
       if(status!==true) return $q.notify({message:status})
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

}

const totalPrice=computed(()=>props.shoppingCart.reduce((collect,currentVal)=>collect+currentVal.count*currentVal.price,0))
</script>
<template>
<q-dialog persistent full-height full-width >
      <q-card class="on-left on-right" style="font-family: 'EB Garamond', serif;" >
      <q-icon name="o_close" style="z-index:1;" class="absolute-top-right q-ma-sm cursor-pointer"  size="md" v-close-popup></q-icon>
      <q-card-section id="card">
      <q-card-section  class="text-h5 text-center" style="font-family: 'Metal Mania', cursive;">Shopping Cart for Turkey</q-card-section>
     <q-table
      :rows="rows"
      id="table"
      :columns="columns"
      row-key="name"
      flat
      hide-bottom
     table-header-class="text-uppercase"
     table-header-style="    font-family: 'Righteous', cursive;"
     table-style="   font-family: 'EB Garamond', serif; font-size:1.2rem;letter-spacing:1px;"
     table-class="text-bold"
     :pagination="{rowsPerPage:0}"
    >
          <template v-slot:body-cell-price="props">
        <q-td :props="props">
         <small>$</small> <strong>{{props.row.price*props.row.count}}</strong>
        </q-td>
      </template>
      <template v-slot:bottom-row>
        <q-td></q-td><q-td></q-td><q-td></q-td>
        <q-td  class="text-center">
         <small>$</small> <strong class="text-body2 text-bold">{{totalPrice}}</strong>
        </q-td>
      </template>
    </q-table>  
      </q-card-section>
  
           <q-card-actions align="around" style="font-family: 'Tourney', cursive;">
               <q-btn outline label="keep shopping" color="accent"  size="lg" class="q-my-md q-mx-sm" v-close-popup></q-btn>
               <q-btn outline label="download" color="positive" size="lg" class="q-my-md q-mx-sm" @click="tableDownload"></q-btn>
           </q-card-actions>
  </q-card>
</q-dialog>
</template>

