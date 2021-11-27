<script setup>
import { reactive, ref ,} from "@vue/reactivity";
import { useSSRContext, watch } from "@vue/runtime-core";
import voronoi from "css-houdini-voronoi/dist/worklet.js?url"
CSS.paintWorklet.addModule(voronoi);
import dataOfCountries from "../storage/data.json"
const countryModel=ref("");
const countryOptions=[];
const selectCase=ref(false)
for(const [index,value] of dataOfCountries.entries()){
    const slugify=value.country.split(" ").join("_")
    countryOptions[index]=value.country
}
const emit=defineEmits(['update:current-country'])
watch(countryModel,(to,from)=>{
    if(!to) return
    const currentCountry=dataOfCountries.find(item=>item.country.toLocaleLowerCase()==to.toLocaleLowerCase())
    emit('update:current-country',currentCountry)
})
let selectOptions=ref([...countryOptions])
const selectFilterFn=(val,update)=>{
    update(()=>{
    if(!val)return selectOptions.value=[...countryOptions]
    selectOptions.value=countryOptions.filter(item=>item.toLowerCase().indexOf(val.toLowerCase())>-1)
    })
}

</script>

<template>
<div id="home-bg"  style="width:100%;height:100vh;position:relative;">
    <div class=" bg positive text-center full-width row justify-center absolute-center"  >
        <div class="col-9 col-md-5">
            <q-select id="select" dir="ltr" style="direction:ltr; unicode-bidi: bidi-override;" :class="{'t-top':selectCase}"   @popup-show="selectCase=true" @popup-hide="selectCase=false" v-model="countryModel" label-slot  hide-selected fill-input dense use-input input-debounce="10" input-class="q-ma-md" input-style="font-family: 'Righteous', cursive;+
 " @filter="selectFilterFn"  color="white" label-color="dark"      popup-content-class="q-pa-sm bg-transparent text-dark text-weight-medium" options-selected-class="text-purple" :behavior="$q.platform.is.ios === true || $q.screen.lt.md ? 'dialog' : 'menu'"    :options="selectOptions">
            <template v-slot:label>
                <span class="text-h5  text-dark" style="font-family: 'Righteous', cursive;
">Choose your Destiny</span>
            </template>
            </q-select>
        </div>
        <div class="col-12"></div>
        <h6 v-show="!selectCase" class="col-9 col-md-5 q-mt-xl text-dark" style="font-family: 'Roboto Slab', serif;">
       Your salary changes to the average salary of the country you selected.   
        </h6>
    </div>
</div>
</template>
<style lang="scss" >
.t-top{
    transform:translateY(-60px);
}
/* width */
::-webkit-scrollbar {
  width: 5px;
  }

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px transparent; 
  border-radius: 2px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: $info; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: blue; 
}

@property --voronoi-number-of-cells {
    syntax: "<integer> | auto";
    initial-value:3;
    inherits: false;
}
@property --voronoi-margin {
    syntax: "<percentage>";
    initial-value: 0%;
    inherits: false;
}
@property --voronoi-line-color {
    syntax: "<color>";
    initial-value: transparent;
    inherits: false;
}
@property --voronoi-line-width {
    syntax: "<integer>";
    initial-value: 1;
    inherits: false;
}
@property --voronoi-dot-color {
	syntax: '<color>';
	initial-value: transparent;
	inherits: false;
}
@property --voronoi-dot-size {
	syntax: '<integer>';
	initial-value: 2;
	inherits: false;
}
@property --voronoi-cell-colors {
	syntax: '<color>#';
	initial-value: #99ffcc,#99ff99,#66ccff, #00ffcc, #33ccff, #66ff99, #00ffff;
	inherits: false;
}
@property --voronoi-seed {
  syntax: '<number>';
  initial-value: 223456;
  inherits: true;
}
#home-bg{
    background: paint(voronoi)  no-repeat fixed center center ;
    background-size: cover;
}</style>
