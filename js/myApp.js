//路由范围与检测
var routeRange = {
    action: [],
    dos: [],
    //检测数组this[key]中是否包含val元素
    check: function (key, val) {
        var status = false;
        for (var i in this[key]) {
            if (this[key][i].indexOf(val) > -1) {
                status = true;
            }
        }
        return status;
    },
    //向this[key]中推入新元素val
    set: function (action, dos) {
        if (!this.check(this.action, action)) {
            this.action.push(action);
        }
        if (!this.check(this.dos, dos)) {
            this.dos.push(dos);
        }
    }
};
//错误页
var page404 = function ($scope) {
    $scope.msg = '404 Not Found.!';
};

var myApp = angular.module('myApp', ['ngRoute']);
//ngRoute
myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/:action/:dos', {
            controller: ['$scope', '$routeParams', function ($scope, $routeParams) {
                var action = $routeParams.action;
                var dos = $routeParams.dos;
                //检测action与dos是否已经在routeRange中定义
                if (routeRange.check('action', action) && routeRange.check('dos', dos)) {
                    var dos = dos.replace(/(^|\s+)\w/g, function (s) {
                        return s.toUpperCase();
                    });
                    eval(action + dos + 'Ctrl($scope, $routeParams)');
                } else {
                    page404($scope);
                }
            }],
            templateUrl: function ($routeParams) {
                var action = $routeParams.action;
                var dos = $routeParams.dos;
                if (routeRange.check('action', action) && routeRange.check('dos', dos)) {
                    return 'template/' + $routeParams.action + '/' + $routeParams.dos + '.html';
                } else {
                    return 'template/page/404.html';
                }
            }
        })
        .otherwise({
            redirectTo: '/index/index'
        });
}]);

//example
routeRange.set('index', 'index');
var indexIndexCtrl = function ($scope, $routeParams) {
    $scope.action = $routeParams.action;
    $scope.dos = $routeParams.dos;
    $scope.text = 'hello world.!';
};

