<template>
    <div>
        <div class="movie_top">
            <router-link to="/">
                <i></i>
                <span>Назад к списку</span>
            </router-link> 
        </div>
        <div v-if=loading>
            <Loading/>
        </div>
        <div v-else-if=error class="movie_error">
            <h4>К сожалению, по вашему запросу ничего не найдено...</h4>
        </div>
        <div v-else v-bind:key="item.id">
            <Card :data={item} />
        </div>
    </div>
</template>


<style lang="scss">
.movie_top {
    padding-top: 42px;
    padding-bottom: 22px;
    border-bottom: 1px solid #C4C4C4;

    & ~ div {
        padding-top: 40px;
    }

    a {
        color: #FF5252;
        text-decoration: none;
        font-size: 20px;
        line-height: 20px;

        &.router-link-exact-active {
            color: #FF5252;
        }

        > i {
            display: inline-block;
            vertical-align: middle;
            width: 12px;
            height: 20px;
            background: url('~@/assets/media/arrow.svg');
            background-size: cover;
            margin-right: 20px;
        }

        > span {
            display: inline-block;
            vertical-align: middle;
            border-bottom: 1px solid #FF5252;
        }

        &:hover > span {
            border: none;
            padding-bottom: 1px;
        }
    }
}

.movie_error {
    h4{
        font-family: "Roboto-Regular";
        font-size: 32px;
        line-height: 40px;
    }
}

</style>

<script>
import Card from '@/components/Card.vue';
import Loading from '@/components/Loading.vue';
const axios = require('axios');

export default {
    name: 'movie',
    components: {
        Card,
        Loading
    },
    data: () => ({
        item: {},
        error: false,
        loading: true
    }),
    created(){
        /* 
            Получаем переданные данные из Card.vue 
                если есть выводим, либо запрашиваем из API 
        */
        const Movie = this.$route.params.item;

        if(!!Movie) {

            this.loading = false;
            this.item = Movie;

        } else {
        
            // Запрос на получение фильма
            axios.get(`https://floating-sierra-20135.herokuapp.com/api/movie/${this.$route.params.id}`)
                .then(response => {
                    let dataMovie = response.data.data;
                    dataMovie != null ? this.item = dataMovie : this.error = true;
                })
                .catch(error => {
                    this.error = true;
                })
                .finally(() => (this.loading = false))
                .then(() => {});
        }

    }
}
</script>
