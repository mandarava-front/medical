/**
 *登录模块相关函数初始化
 *
 */
function loginInit() {
    // 初始化更改用户信息
    changeUserInfo();

    // 创建模态框
    createModelBody();

    // 点击模态框的登录按钮
    $("#sendLogin").click(loginThrottle(loginInfo, 500));

    // 点击模态框的注册
    $('#sendRegister').click(register);
    // 事件委托
    $('.top-body-user').on('click', 'li', function(e) {
        // 点击退出登录按钮
        if ($(e.target).hasClass('exitLogin')) {
            // 退出登录函数
            exitLogin();
        }
    })

    $("#registerModal").on('change', 'input', function(e) {
        // 注册的表单验证
        var resOk = checkRes();
        if (resOk) {
            $('#sendRegister').removeAttr('disabled');
        } else {
            $('#sendRegister').attr('disabled', 'disabled');
        }
    })
    $("#loginModal").on('change', 'input', function(e) {
        // 登录表单验证
        var loginOk = checkLogin();
        if (loginOk) {
            $('#sendLogin').removeAttr('disabled');
        } else {
            $('#sendLogin').attr('disabled', 'disabled');
        }

    })
}

/**
 *登录核心函数
 *
 */
function login() {
    // 获取表单传递过来的值
    var name = $('#loginUserName').val(); // 获取用户输入的用户名
    var pwd = $('#loginUserPwd').val(); // 获取用户输入的密码
    // 发送ajax请求
    $.ajax({
        url: "https://www.fastmock.site/mock/df683b01e605cb9506e7fe96fce5e23f/v1/login",
        type: 'post',
        async: false, // 登录的时候需要同步完成，否则获取不到设置的本地存储信息
        data: {
            'username': name,
            'userpwd': pwd,
        },
        dataType: 'json',
        success: function(data) {
            console.log(data)
            console.log('登录')
                // // 登录成功
            if (data.userMsg.isLogin == 'no') {
                // 清除本地存储信息
                localStorage.removeItem('isLogin');
                // 设置本地存储信息
                localStorage.setItem('isLogin', true); // 更新登录标记
                localStorage.setItem('username', name); // 设置用户名
            }
            // 登录失败
            else {
                // 清除本地存储信息
                localStorage.removeItem('isLogin');
            }
        }
    })


}

/**
 *注册的核心函数
 *注册功能不需要回调函数，在点击注册按钮的时候，成功或者失败都返回提示信息。
 * 
 */
function register() {
    // 获取传递过来的值
    var name = $('#registerUserName').val(); //用户名
    var pwd = $('#registerPassword').val(); //密码
    var email = $("#registerUserEmail").val(); //邮箱
    var d = {};
    d.name = name;
    d.pwd = pwd;
    d.email = email;
    $.ajax({
        url: '/register',
        type: 'post',
        data: d,
        dataType: 'json',
        success: function(data) {
            if (data.msg == 'ok') {
                // 提示信息
                alert('注册成功')
                    // 模态框关闭
                $('#registerModal').modal('toggle');
            } else {
                alert('注册失败');
                // 清空数据
                $('#registerUserName').val("");
                $('#registerPassword').val("");
                $("#registerUserEmail").val("");
                $('#registerConfirmPwd').val("");
                // 获取焦点
                $('#registerUserName').focus();
            }
        }
    })
}

/**
 *节流函数防止用户多次触发
 *
 * @param {Function} fn 回调函数
 * @param {Number} time 时间频率
 * @return {Function} 闭包函数 
 */
function loginThrottle(fn, time) {
    var timer;
    return function() {
        var context = this,
            args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, time)
    }
}

/**
 *登录回调
 *
 */
function loginInfo() {
    if (isLogin()) {
        // 已经登录
        alert('您已经登录！')
    } else {
        login();
        if (localStorage.getItem("isLogin")) {
            alert('登录成功');
            $('#loginModal').modal('toggle');
        } else {
            alert('登录失败');
        }
    }
    // 更新用户模块的列表
    changeUserInfo();
}

/**
 *安全退出函数
 *
 */
function exitLogin() {
    if (localStorage.getItem("isLogin")) {
        // 清除本地存储信息
        localStorage.removeItem('isLogin');
        alert('退出登录成功');
        // 更新用户模块的列表
        changeUserInfo();
    } else {
        alert('您未登录！！');
    }
}


/**
 * 登录验证函数
 *
 * @return {Boolean} true为验证成功,false为验证失败 
 */
function isLogin() {
    var login = localStorage.getItem('isLogin');
    // 登录判断
    if (!login) {
        return false;
    } else {
        return true;
    }
}

/**
 * 用于登录模块的用户数据渲染
 *
 */
function changeUserInfo() {
    // 获取元素下拉列表二级元素
    var $menu = $('.top-body-user');
    // 设置登录前后的下拉列表字符串
    var loginMenu = '<li><a style="display: block;margin: 5px 0;" href="personal.html" class="btn btn-info btn-sm">个人中心</a><button type="button" class="btn btn-danger btn-sm exitLogin">退出</button></li>',
        noLoginMenu = '<li><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#registerModal">注册</button></li><li><button type="button" class="btn btn-default" data-toggle="modal" data-target="#loginModal">登录</button></li>';
    // 清空下拉列表
    $menu.empty();
    if (localStorage.getItem("isLogin")) { // 包含用户信息
        $('.top-header-user span').html(localStorage.getItem('username')); // 设置用户名
        $menu.append(loginMenu);
        // 设置用户头像
        console.log(localStorage.getItem('userImg'))
        $('.top-header-user img').attr('src', '../img/noLogin.jpg').show();
    } else {
        $('.top-header-user span').html("用户"); // 未登录状态显示默认用户名
        $menu.append(noLoginMenu);
        // 设置用户头像
        $('.top-header-user img').attr('src', '../img/noLogin.jpg').hide();
    }
}

/**
 * 登录注册模块的模态框
 *
 */
function createModelBody() {
    var loginModalStr = `
    <!-- 登录模块的模态框 开始 -->
        <div class="modal fade  bs-example-modal-sm" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">登录</h4>
                    </div>
                    <div class="modal-body">
                        <form action="#">
                            <div class="form-group">
                                <label class="sr-only" for="exampleInputName1">用户名</label>
                                <input type="text" class="form-control" id="loginUserName" aria-describedby="userHelpBlock"
                                    autocomplete="on" placeholder="请输入用户名/邮箱">
                                <span id="logUserName" class="help-block">请输入6-15位字母、数字、下划线组合的用户名</span>
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="exampleInputPassword3">密码</label>
                                <input type="password" class="form-control" id="loginUserPwd"
                                    aria-describedby="pwdHelpBlock" autocomplete="on" placeholder="请输入密码">
                                <span id="logUserPwd" class="help-block">以字母开头，长度在6-18之间，只能包含字符、数字和下划线。</span>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" id="sendLogin">登录</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 登录模块的模态框 结束 -->`;
    var registerModalStr = `
    <!-- 注册模块的模态框 开始 -->
    <div class="modal fade bs-example-modal-lg" id="registerModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">用户注册</h4>
                </div>
                <div class="modal-body">
                    <form action="#">
                        <div class="form-group">
                            <label class="sr-only" for="userName">用户名</label>
                            <input type="text" class="form-control" id="registerUserName" autocomplete="on"
                                placeholder="请输入用户名">
                                <span id="resUserName" class="help-block">请输入6-15位字母、数字、下划线组合的用户名</span>
                        </div>
                        <div class="form-group">
                            <label class="sr-only" for="userEmail">邮箱</label>
                            <input type="email" class="form-control" id="registerUserEmail" autocomplete="on"
                                placeholder="请输入注册邮箱">
                                <span id="regUserEmail" class="help-block">请输入邮箱</span>
                        </div>
                        <div class="form-group">
                            <label class="sr-only" for="Password">密码</label>
                            <input type="password" class="form-control" id="registerPassword" autocomplete="on"
                                placeholder="请输入密码">
                                <span id="resUserPwd" class="help-block">以字母开头，长度在6-18之间，只能包含字符、数字和下划线。</span>
                        </div>
                        <div class="form-group">
                            <label class="sr-only" for="confirmPwd">确认密码</label>
                            <input type="password" class="form-control" id="registerConfirmPwd" autocomplete="on"
                                placeholder="请再次输入密码">
                                <span id="resUserConPwd" class="help-block">请输入您刚才输入的密码</span>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="sendRegister">注册</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 注册模块的模态框 结束 -->`;
    $('body').append($(loginModalStr));
    $('body').append($(registerModalStr));
}

/**
 * 表单验证
 * 用于验证注册和登录的表单
 */
function checkRes() {
    var registerUserName = $('#registerUserName'), // 用户名表单
        resUserName = $('#resUserName'), // 用户名提示框
        registerUserEmail = $('#registerUserEmail'), //邮箱表单
        regUserEmail = $('#regUserEmail'), // 邮箱提示框
        registerPassword = $('#registerPassword'), // 密码表单
        resUserPwd = $('#resUserPwd'), // 提示框
        registerConfirmPwd = $('#registerConfirmPwd'), // 确认密码表单
        resUserConPwd = $("#resUserConPwd"); // 确认密码提示框

    // 用户名验证
    var regName = /^[0-9A-Za-z_]{6,15}$/; // 6到15位字母数字下划线组合的
    if (!regName.test(registerUserName.val())) {
        resUserName.html('请输入正确的用户名！')
        resUserName.css('color', 'red');
    } else {
        resUserName.html('用户名格式正确！');
        resUserName.attr('isOk', 'ok');
        resUserName.css('color', '#01AAED');
    }


    // 验证邮箱
    var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮箱正则表达式
    if (!regEmail.test(registerUserEmail.val())) {
        regUserEmail.html('请输入正确的邮箱！')
        regUserEmail.css('color', 'red');
    } else {
        regUserEmail.html('邮箱格式正确！！');
        regUserEmail.attr('isOk', 'ok');
        regUserEmail.css('color', '#01AAED');
    }

    // 密码验证
    var regPwd = /^[a-zA-Z]\w{5,17}$/; // 以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
    if (!regPwd.test(registerPassword.val())) {
        resUserPwd.html('请输入以字母开头，长度在6-18之间，只能包含字符、数字和下划线的密码！');
        resUserPwd.css('color', 'red');
    } else {
        resUserPwd.html('密码格式正确！');
        resUserPwd.attr('isOk', 'ok');
        resUserPwd.css('color', '#01AAED');
    }

    // 确认密码
    if (!regPwd.test(registerConfirmPwd.val())) {
        resUserConPwd.html('请输入以字母开头，长度在6-18之间，只能包含字符、数字和下划线的密码！');
        resUserConPwd.css('color', 'red');
    } else if (!registerConfirmPwd.val() == registerPassword.val()) {
        resUserConPwd.html('两次密码不一致！');
        resUserConPwd.css('color', 'red');
    } else {
        resUserConPwd.html('两次密码一致！');
        resUserConPwd.attr('isOk', 'ok');
        resUserConPwd.css('color', '#01AAED');
    }


    if (
        resUserName.attr('isOk') == 'ok' &&
        regUserEmail.attr('isOk') == 'ok' &&
        resUserPwd.attr('isOk') == 'ok' &&
        resUserConPwd.attr('isOk') == 'ok'
    ) {
        return 'ok';
    }
}

/**
 * 登录的验证函数
 *
 */
function checkLogin() {
    var loginUserName = $('#loginUserName'), // 用户名表单
        logUserName = $('#logUserName'), // 用户名提示框
        loginUserPwd = $('#loginUserPwd'), // 密码表单
        logUserPwd = $('#logUserPwd'); // 提示框

    // 用户名验证
    var regName = /^[0-9A-Za-z_]{5,8}$/; // 6到15位字母数字下划线组合的
    if (!regName.test(loginUserName.val())) {
        logUserName.html('请输入正确的用户名！')
        logUserName.css('color', 'red');
    } else {
        logUserName.html('用户名格式正确！');
        logUserName.attr('isOk', 'ok');
        logUserName.css('color', '#01AAED');
    }

    // 密码验证
    var regPwd = /^[0-9A-Za-z_]{5,17}$/; // 以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
    if (!regPwd.test(loginUserPwd.val())) {
        logUserPwd.html('请输入以字母开头，长度在6-18之间，只能包含字符、数字和下划线的密码！');
        logUserPwd.css('color', 'red');
    } else {
        logUserPwd.html('密码格式正确！');
        logUserPwd.attr('isOk', 'ok');
        logUserPwd.css('color', '#01AAED');
    }

    if (
        logUserName.attr('isOk') &&
        logUserPwd.attr('isOk')
    ) {
        return 'ok';
    }

}