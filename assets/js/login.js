$(function() {
    // 点击切换效果
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").click(() => {
        $(".reg-box").hide();
        $(".login-box").show();

    })

    const form = layui.form;
    form.verify({
        // 定义校验密码的
        pwd : [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ] ,
          repwd :(val) => {
            const pwd = $(".reg-box [name=password]").val();
            if(val !== pwd) return "两次密码不一致";
          }
    })

    // const baseUrl = "http://www.liulongbin.top:3007";
    const layer = layui.layer;
   $("#form_reg").on("submit",function(e) {
    e.preventDefault();
    $.ajax({
        type:"POST",
        url:"/api/reguser",
        data : {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val(),
        },
        success : (res) => {
            if(res.status !==0) return layer.msg("注册失败");
            layer.msg("注册成功！");
            $("#link_login").click();
        },
    });
   });


   $("#form_login").on("submit",function(e) {
       e.preventDefault();
       $.ajax({
           type:"POST",
           url:"/api/login",
           data:$(this).serialize(),
           success : (res) => {
               if(res.status !==0) return layer.msg("登陆失败");
               layer.msg("登陆成功！")
               localStorage.setItem("token",res.token);
               location.href ="/index.html"
           },
       });
   });
});