<template>
    <div>
        <div class="catalog_top">
            <h2>Фильмы</h2>
            <ul>
                <li>
                    <label class="catalog_checkbox">
                        <input 
                            type="checkbox" 
                            value="title" 
                            v-model="sorting" 
                            v-bind:disabled="sortCatalog==='title'" 
                            v-on:click="sortItem()" 
                        />
                        <i></i>
                        <span>Отсортировать по названию</span>
                    </label>
                </li>
                <li>
                    <label class="catalog_checkbox">
                        <input 
                            type="checkbox" 
                            value="year" 
                            v-model="sorting" 
                            v-bind:disabled="sortCatalog==='year'" 
                            v-on:click="sortItem()" 
                        />
                        <i></i>
                        <span>Отсортировать по году</span>
                    </label>
                </li>
            </ul>
        </div>
        <div v-if=loading>
            <Loading/>
        </div>
        <div v-else-if=error class="catalog_error">
            <h4>К сожалению, по вашему запросу ничего не найдено...</h4>
        </div>
        <div v-else>
            <div v-for="item in catalog" v-bind:key="item.id">
                <Card :data={item} :catalog=true />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.catalog_top {
    padding-top: 40px;
    padding-bottom: 18px;
    border-bottom: 1px solid #C4C4C4;

    & ~ div {
        padding-top: 32px;
    }

    > h2 {
        font-family: "Roboto-Regular";
        font-size: 32px;
        line-height: 32px;
        padding-bottom: 18px;
    }

    > ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: start;
        
        > li {
            font-family: "Roboto-Regular";
            font-size: 16px;
            line-height: 16px;
            color: #C4C4C4;
            user-select: none;
        }

        > li:not(:last-child) {
            padding-right: 34px;
        }
    }
}

.catalog_checkbox {
    cursor: pointer;

    input {
        display: none;
    }

    i {
        display: inline-block;
        vertical-align: middle;
        width: 15px;
        height: 15px;
        border: 1px solid #C4C4C4;
        margin-right: 10px;
        position: relative;

        transition: .6s;

        &:after {
            position: absolute;
            top: -10px;
            left: 0;
            content: '';
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url('~@/assets/media/checkbox.svg');
            background-size: cover;
            transform: scale(2.5);
            opacity: 0;

            transition: .3s;
        }
    }

    input:checked ~ i {
        border-color: #FF5252;
        background: #FF5252;
        
        &:after {
            top: 0;
            opacity: 1;
            transform: scale(1);
        }
    }

    span {
        vertical-align: middle;
    }
}

.catalog_error {
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
    name: 'catalog',
    components: {
        Card,
        Loading
    },
    data: () => ({
        catalog: [],
        error: false,
        loading: true,
        sorting: []
    }),
    methods: {
        sortItem(){
            this.sorting = [];
        }
    },
    computed: {
        sortCatalog() {

            // Получаем значение value из checkbox 
            let sort = this.sorting[0];

            if(this.catalog.length === 0) return;

            // Сортируем по title
            if(sort === 'title') {
                this.catalog = this.catalog.sort((prev, curr) => {
                    let titleA=prev.title.toLowerCase(), titleB=curr.title.toLowerCase();
                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0
                });
            }
    
            // Сортируем по year
            if(sort === 'year') {
                this.catalog = this.catalog.sort((prev, curr) => prev.year - curr.year);
            }
            
            return sort;
        }
    },
    created(){

        // Запрос на получение списка фильмов
        axios.get('https://floating-sierra-20135.herokuapp.com/api/movies')
            .then(response => {
                let dataCatalog = response.data.data;
                dataCatalog != null ? this.catalog = dataCatalog : this.error = true;
            })
            .catch(error => {
                this.error = true;
            })
            .finally(() => (this.loading = false))
            .then(() => {});
    }
}
</script>
