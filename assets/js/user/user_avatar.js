$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
$('#btnChooseImage').on('click', function() {
    $('#file').click()
  })
  const layer = layui.layer;
  $("#btnUpload").click(() => {
    // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
    .toDataURL("image/png");
    // 2、发送 ajax 请求，发送到服务器
    $.ajax({
        method: "POST",
        url: "/my/update/avatar",
        data: {
            avatar: dataURL,
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg("更换头像失败！");
            }
            layer.msg("更换头像成功！");
            window.parent.getUserInfo();
        },
    });
});
})