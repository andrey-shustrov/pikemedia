<template>
    <footer>
        <div>
            @ 2020 г. <a target="_blank" rel="noopener noreferrer" href="https://lonwan.ru">lonwan.ru</a> 
            <span>24 декабря 2020 год.</span>
        </div>
    </footer>
</template>

<style lang="scss">
footer {
    padding: 15px;

    > div {
        margin: 0 auto;
        max-width: 1440px;

        a {
            color: #FFF;

            &:hover {
                text-decoration: none;
            }

            &.router-link-exact-active {
                color: #FFF;
            }
        }

        > span {
            margin-left: 10px;
            color: #988F8F;
            font-style: italic;
        }
    }
}
</style>