<template>
    <div class="loading">
        <div>
            <div>
                <div>
                    <i></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.loading {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    
    > div {
        display: table;
        width: 100%;
        height: 100%;
        min-height: 400px;

        > div {
            
            display: table-cell;
            vertical-align: middle;
            text-align: center;

            > div {
                padding-top: 250px;
                padding-bottom: 40px;
                
                > i {
                    display: inline-block;
                    width: 136px;
                    height: 136px;
                    position: relative;

                    &:after {
                        position: absolute;
                        left: -10px;
                        top: 4px;
                        content: '';
                        display: inline-block;
                        width: 136px;
                        height: 136px;
                        background: url('~@/assets/media/loader_1.svg');
                        background-size: cover;
                        animation: .5s linear 0s normal none infinite running rot;
                    }

                    &:before {
                        position: absolute;
                        left: -21px;
                        top: 11px;
                        content: '';
                        display: inline-block;
                        width: 136px;
                        height: 136px;
                        background: url('~@/assets/media/loader_2.svg');
                        background-size: cover;
                        animation: .5s linear 0s normal none infinite running rot;
                        transform: rotate(280deg);
                    }

                }
            }
        }
    }

}

@keyframes rot {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>