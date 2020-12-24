<template>
    <div id="app">
        <Header/>
        <section>
            <div>
                <router-view/>
            </div>
        </section>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'home',
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/reset.scss';
@import '@/assets/styles/fonts.scss';

html,
body {
    background-color:#363232;
}

#app {
    font-family: "Roboto-Regular";
    line-height: 12px;
    font-size: 12px;
    color: #FFF;

    display: flex;
    min-height: 100vh;
    flex-direction: column;

    > section {
        flex: 1;
        padding-left: 15px;
        padding-right: 15px;

        > div {
            margin: 0 auto;
            max-width: 1440px;
            min-height: 300px;
        }
    }
}
</style>
