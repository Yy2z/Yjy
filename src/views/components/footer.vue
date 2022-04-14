<template>
    <div class="k-daelk6">
        <div class="k-daelk6-content">
            <div>
                <p>EMAIL</p>
                <p class="k-daelk6-info">anmenglu30819@163.com</p>
            </div>
            <div>
                <p>GITEE</p>
                <p class="k-daelk6-info"><a href="https://gitee.com/geeksdidi/personal-website">点击进入仓库</a> </p>
            </div>
            <div>
                <p>COMMUNITY</p>
                <p class="k-daelk6-info">in</p>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.k-daelk6 {
    background: #212121;
    padding: 50px 80px;

    color: #e6b022;
    font-weight: bolder;
    .k-daelk6-content {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        div {
            a{
                text-decoration: none;
                color: #fff;
            }
            font-size: 20PX;
            margin: 10PX 0;
            .k-daelk6-info {
                color: #fff;
                cursor: pointer;
                margin-top: 10px;
                font-weight: normal;
            }
            .k-daelk6-info:hover {
                color: #e6b022;
            }
        }
        @media screen and (min-width: 1200px) {
            div {
                font-size: 20px;
            }
        }
    }
}
</style>