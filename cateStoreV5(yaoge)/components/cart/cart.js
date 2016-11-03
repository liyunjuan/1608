angular.module('CartComp', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('cart', {
				url: '/cart',
				templateUrl: './components/cart/cart.html',
				controller: 'cartCtrl'
			})
	}])
	
	.service('getGoodsData', function($http) {


	})
	.controller('cartCtrl', ["$scope", "$css", "getGoodsDetailData", "getGoodsData", "IndexgetData", function($scope, $css, getGoodsDetailData, getGoodsData, IndexgetData) {
		$css.add('./components/cart/cart.css');
		$scope.clk = function() {
			//getData.toBack();
			window.history.back();

		};

		$scope.allGoods = [];

		var arr = new Array();
		var arrLast = new Array();
		var arrStr = new Array();

		//读取出service中的全局购物车数组

		$scope.carArr = IndexgetData.myCarStorage();

		for(var n = 0; n < $scope.carArr.length; n++) {
			var data = JSON.parse(window.localStorage.getItem($scope.carArr[n].goodId));
			arr.push(data);
		}

		for(var j = 0; j < arr.length; j++) {
			if(arrStr.indexOf(arr[j].data.goodId) < 0) {
				arrStr.push(arr[j].data.goodId);
			}
		}

		for(var x = 0; x < $scope.carArr.length; x++) {
			var storeGood = JSON.parse(window.localStorage.getItem($scope.carArr[x].goodId));

			for(var j = 0; j < arrStr.length; j++) {
				var m = 0;
				if(arrStr[j] == storeGood.data.goodId) {
					for(var i = 0; i < $scope.carArr.length; i++) {
						var data1 = JSON.parse(window.localStorage.getItem($scope.carArr[i].goodId));
						if(storeGood.data.goodId == data1.data.goodId) {
							m++;
						}
					}
					storeGood.data["allCarNums"] = m;
					var obj = {
						"goodId": storeGood.data.goodId,
						"num": m,
						"data": storeGood
					};

					IndexgetData.addNum(obj, m);

					arrLast.push(storeGood.data);

					arrStr.splice(j, 1);
				}
			}
		}
		$scope.goodsInfo = arrLast;

		//减号点击事件
		$scope.goodsSub = function(e, event) {
			event = event || window.event;
			console.log("删除", e);

			var newData = IndexgetData.getNum();

			IndexgetData.changeNum(e, -1);
			$(event.target).siblings(".aaaa").text(IndexgetData.getByNum(e));
			$(event.target).parents(".cart_info").find(".money").text("￥"+$(event.target).siblings(".aaaa").text() * $(event.target).parents(".cart_info").find(".myPrice").text());
			IndexgetData.changeMyCarStorageTODesOne(e);

			if($(event.target).siblings(".aaaa").text() == 0) {
				console.log("我要删除所有了");
				window.localStorage.removeItem(e);
				for(var n = 0; n < newData.length; n++) {
					if(newData[n].goodId == e) {
						IndexgetData.changeMyCarStorageTODes(newData[n].data.data);
					}
				}
				IndexgetData.delNum(e);

				$(event.target).parents(".cart_info").remove();
			}

			$scope.$watch(function() {
				console.log(222)
				$scope.b = $(event.target).next().html();
				console.log($scope.b);
			});

			$(event.target).parents(".cart_info").find(".money").text("￥"+$(event.target).siblings(".aaaa").text() * $(event.target).parents(".cart_info").find(".myPrice").text());

		};
		$scope.b = 1;

		//加号点击事件
		$scope.goodsAdd = function(e, event) {
			event = event || window.event;
			console.log("添加");

			var newData = IndexgetData.getNum();

			IndexgetData.changeNum(e, 1);
			var obj = {
				shopName: $(".check_no").children("p").html(),
				shopImage: $(".info_img").children("p").html(),
				shopIntro: $(".info_more p:first-of-type span:first-of-type").html(),
				goodPrice: $(".info_more p:first-of-type span:last-of-type").html(),
				goodOriPrice: $(".info_more p:last-of-type").html(),
				goodId: e
			};

			IndexgetData.changeMyCarStorage(obj);

			$(event.target).siblings(".aaaa").text(IndexgetData.getByNum(e));

			//数量改变  价格改变
			$scope.$watch(function() {
				//输入框 b
				$scope.b = $(event.target).prev().html();
				console.log($scope.b);
			});

			$(event.target).parents(".cart_info").find(".money").text("￥"+$(event.target).siblings(".aaaa").html() * $(event.target).parents(".cart_info").find(".myPrice").html());

		};

	}])