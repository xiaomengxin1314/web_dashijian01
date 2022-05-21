$(function() {
    const form = layui.form;
    form.verify({
        nickname:(val) => {
            if(val.length > 6) return"昵称长度必须在1~6个字符之间"
        },
    });
    const intUser = () => {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success :(res) => {
                if(res.status !==0) return layer.msg("获取用户信息失败")
                layer.msg("获取用户信息成功")
                form.val("forUserInfo",res.data)
            }
        })
    }
    intUser();

    // 实现重置功能
    $("#btnres").click((e) => {
        e.preventDefault();
        intUser();

    })


    //更新用户信息
    $(".layui-form").on("submit",function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data : $(this).serialize(),
            success : (res) => {
                if(res.status !==0) return layer.msg("更新用户信息失败！")
                layer.msg("更新用户信息成功")
                // * 调用 index.js getUserInfo 方法重新渲染头像
                window.parent.getUserInfo();
            }
        })
    })

});