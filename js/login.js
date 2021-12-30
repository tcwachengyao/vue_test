let login = new Vue({
    el: "#app",
    data: function () {
        return {
            domain: 'http://www.greatidea.com.tw/stsp/sciencePark/',
            isLoading: 0,
            form: {
                account: "",
                password: "",
                code:""
            },
            isSubmit:0
        }
    },
    methods: {
        logoin:function() { 
            var _this = this;
            _this.isLoading = 1;
            console.log(_this.isLoading);
            setTimeout(function(){
                window.location = _this.domain + "member.html";
            }, 2000);
        }
    }
});
