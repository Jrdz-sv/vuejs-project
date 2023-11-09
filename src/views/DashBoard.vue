<template>
    <NavBar/>
    <SideBar/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
    name: 'DashBoard',
    components: {
        NavBar,
        SideBar,
    },
}
</script>