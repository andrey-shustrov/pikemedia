<template>
    <div v-bind:class=topClass>
        <div class="card_box">
            <div class="card_info" v-if=item.collapse.duration>
                <div>
                    <p>{{item.collapse.duration[0]}}</p>
                </div>
            </div>
            <div class="card_content">
                <div>
                    <img :src=item.poster :alt=item.title />
                </div>
                <div>
                    <h3 v-if=linkMovie>
                        <router-link :to="{name:'movie', hash:`/${item.id}`, params:{item: item}}">
                            {{item.title.replace(/\&\#039\;/g,"'")}}
                        </router-link>
                    </h3>
                    <h3 v-else>
                        {{item.title.replace(/\&\#039\;/g,"'")}} {{/** Фикс апострофа ;-) */}}
                    </h3>
                    <dl>
                        <dt>{{item.year}},</dt>
                        <dd>{{item.genres.join(', ').replace(/\&\#039\;/g,"'")}}</dd>
                    </dl>
                    <dl v-if=item.producers>
                        <dt>Режиссёр:</dt>
                        <dd>{{item.producers.join(', ').replace(/\&\#039\;/g,"'")}}</dd>
                    </dl>
                    <dl v-if=item.actors>
                        <dt>Актёры::</dt>
                        <dd><span>{{item.actors.join(', ').replace(/\&\#039\;/g,"'")}}</span></dd>
                    </dl>
                    <p v-if=item.description>{{item.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

.card_animation {

    > .card_box {
        position: relative;
        top: 0;
        left: 2px;
        box-shadow: none;
        transition: box-shadow .3s, top .3s, left .3s;

        &:hover {
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.35);
            top: -8px;
            left: 0;
        }
    }
}

.card {
    position: relative;
    min-height: 168px;
    
    display: table;
    width: 100%;
    margin-bottom: 24px;

    > .card_box {
        background-color: #4D4747;
    }

    .card_content {
        display: table-row;

        > div {
            display: table-cell;
        }

        > div:first-child {
            width: 168px;
            background-color: #C4C4C4;
            text-align: center;
            vertical-align: middle;
            line-height: 0;

            > img {
                height: 168px;
                display: inline;
            }
        }

        > div:last-child {
           padding: 32px 24px;
           vertical-align: top;

            > dl {
                display: flex;
                font-size: 12px;
                line-height: 18px;
                color: #988F8F;
                text-transform: uppercase;

                > dt {
                    padding-right: 3px;
                }

                > dd {
                    flex: 1;

                    > span {
                        color:#E5E5E5;
                        text-transform: none;
                    }
                }
            }

            p:not(:empty) {
                font-size: 16px;
                line-height: 20px;
                padding-top: 16px;
            }
        }
    }

    h3 {
        font-family: "Roboto-Medium";
        font-size: 36px;
        line-height: 36px;
        padding-bottom: 12px;

        a {
            color: #FFF;
            text-decoration: none;
            &:hover {
                border-bottom: 2px solid #FFF ;
            }
        }
    }

    .card_info {
        position: absolute;
        right: 0;
        top: 32px;
        width: 184px;
        height: 30px;
        background: url('~@/assets/media/bg.svg');
        background-size: cover;

        > div {
            position: relative;
            z-index: 1;
            
            &:after {
                content: '';
                position: absolute;
                display: inline-block;
                right: 28px;
                top: 6px;
                width: 16px;
                height: 18px;
                background: url('~@/assets/media/movie.svg');
                background-size: cover;
            }

            > p {
                position: relative;
                top: 0;
                left: 0;
                z-index: 2;
                padding: 9px 0 0 18px;
                font-family: "Roboto-Bold";
                font-size: 12px;
                line-height: 12px;
                color: #000;
            }

        }
    }

}
</style>

<script>
export default {
    name: 'card',
    props: ['data', 'catalog'],
    data: function() {

        /*
            Смотрим какая страница для отключения анимации 
                и убирания ссылки на фильм
        */
        let catalogPage = this.catalog ? true : false;

        return {
            item: this.data.item,
            topClass: catalogPage ? 'card card_animation' : 'card',
            linkMovie: catalogPage
        };
    }
}
</script>