import axios from 'axios'

const request = axios.create({
    //配置接口请求的基准路径
    baseURL: "http://api.cpengx.cn/metashop/api",
})

export const getHomepage = (params) => {
    return request({
        method:"GET",
        url: "/homepage",
        //params选项用来配置QUERY的参数
        params,
    })
}

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  