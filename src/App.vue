<script setup>
import materialOutlinedIcons from './icons/material-outlined-icons';
import { useQuasar } from 'quasar'
const $q=useQuasar()
$q.iconSet.set(materialOutlinedIcons)
</script>
<template>
<router-view />
</template>
