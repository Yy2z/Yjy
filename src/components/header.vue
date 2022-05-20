<template>
    <header>
        <div class="container">
            <div class="logo">
                <a href="">
                    <img src="@/assets/home/Yy2z白.png" alt="">
                </a>
            </div>
            <ul>
                <li><a href="#">首页</a></li>
                <li><a href="#">详情</a></li>
                <li><a href="#">更多</a></li>
            </ul>
            <div class="loginbox">
                <a href="https://www.pexels.com/zh-cn/" class="btn">进入</a>


            </div>
        </div>
    </header>
</template>
<style less scoped>
header {
            align-items: center;
            gap: 20px;
            border-radius: 10px;
            backdrop-filter: blur(7px);
            background-color: rgba(174, 45, 164, 0);
            border-right: 1px rgba(40, 40, 40, 0.35) solid;
            position: fixed;
            z-index: 99;
        }
        .container {
            width: 1260px;
            height: 48px;
            margin: auto;
           
            
        }
        .logo {
            margin-left: 0%;
            float: left;
            width: 90px;
            height: 48px;
            
        }
        .logo img {
           height: 28px;
            margin-left: 55%;
            margin-top: 15%;  
        }
        .container ul {
            float: left;
            margin-left: 100px;
            margin-top: 15px;

        }
        .container ul li {
            float: left;
            width: 50px;
            list-style: none;
            text-align: center;
            
        }
        .container ul li a {
            float: left;
            text-decoration: none;
            color: white;
            font-size: 14px;
            

        }
        .loginbox {
            float: right;
            width: 150px;
            margin-top: 25px;
        }
        .btn {
    transform: translate(-50%, -50%);
    width: 80px;
    height: 28px;
    display: inline-block;
    line-height: 28px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 60px;
    text-decoration: none;
    
  }

  .btn:hover {
    animation: animate 8s linear infinite;
  }

  @keyframes animate {
    0% {
      background-position: 0%;
    }

    100% {
      background-position: 400%;
    }
  }

  .btn::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 40px;
    opacity: 0;
    transition: 0.5s;
  }

  .btn:hover::before {
    filter: blur(20px);
    opacity: 1;
    animation: animate 8s linear infinite;
  }
</style>