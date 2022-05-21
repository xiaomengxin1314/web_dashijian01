$(function() {
    getUserInfo();

    // 获取layer
    const layer = layui.layer;
    $("#btnlog").click(() => {
        layui.layer.confirm(
            "确定退出登录？", 
            { icon: 3, title: "" },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = "/login.html";
            }
        );
    })
});
const layer = layui.layer;

function getUserInfo() {
    $.ajax({
        type: "GET",
        url:"/my/userinfo",
        // headers: {
        //     Authorization:localStorage.getItem("token"),
        // },
        success:(res) => {
            console.log(res);
            if(res.status !==0) return layer.msg("获取用户信息失败")
            layer.msg("获取用户信息成功！")
            
            // 调用渲染头像函数
            randerAvater(res.data);

            // 无论成功还是失败，最终都会调用complete 回调函数
            complete:(res) => {
                if(res.responseJOSN.status === 1 && 
                    res.responseJOSN.mes  === "身份认证失败！") {
                        localStorage.removeItem("token");
                        location.href = "/lohin.html"
                    }
            }
        }
    })
}


// 渲染头像函数

const randerAvater = (user) => {
    // 获取名字
    const name = user.nickname || user.username;
    // 设置文本
    $("#welcome").html(`欢迎${name}`);
    // 按需渲染头像
    if(user.user_pic !==null) {
        $(".layui-nav-img").attr("src",user.user_pic).show();
        $(".text-avatar").hide()
    } else{
        $(".layui-nav-img").hide();
        const firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName).show();
    }
}