Vue.use(VueAwesomeSwiper);

var vue = new Vue({
  el: "#app",
  data: function () {
    return {
      domain: 'https://tcwachengyao.github.io/vue_test',
      // domain: '../',
      isScroll: 0,
      isMenu: 0,
      screenWidth: 0,
      menu: [],
      pageBanners: [],

      fullSwiperOption: {
        loop: false,
        pagination: {
          el: '.swiper-pagination'
        },
        effect: 'fade',
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        speed: 1000,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      indexBanners: [],

      // news
      newsPage: {},
      newsList: [],

      // gallery
      galleryPage:{},
      galleryIndex: null,
      gallerySwiperOption: {
        loop: false,
        speed: 1000,
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: {
          nextEl: '.gallery-button-next',
          prevEl: '.gallery-button-prev'
        },
        breakpoints: {
          769: {
            slidesPerView: 7
          }
        }
      },
      popupSwiperOption: {
        loop: false,
        speed: 1000,
        navigation: {
          nextEl: '.popup-button-next',
          prevEl: '.popup-button-prev'
        }
      },

      // mail
      mailList:[],

      // terms
      termsPage: {},
      termsList: [],

      // manual
      manualPage: {},
      manualList: [],

      // apply
      applyPage: {},
      applyList: [],
      isFeedback: false,

      // vote
      votePage: {},
      voteList: [],

      // message
      messagePage: {},
      messageList: [],
      reply:{},
      isReply:false,
      message:'',

      // company
      companyList:[],

      // reserve
      reservePage: {},
      reserveList: [],

      // service
      serviceList:[],
      upload:['','',''],
      preview1:'',
      preview2:'',
      preview3:'',
      uploadIndex:0,
      star:[5,5,5,5],

      // page
      pagination: {
        length: 10, // 每頁10筆資料
        per: 3, // 每次顯示幾個分頁
        active: 1, // 目前分頁
        totle: 0, // 全部分頁數
        page: 1 // 每組分頁起始頁數
      },
    };
  },
  beforeMount: function() {},
  mounted: function() {
    var _this = this;
    window.addEventListener('scroll', function () {
      var top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      if (top > document.documentElement.clientHeight) {
        _this.isScroll = 1;
      } else {
        _this.isScroll = 0;
      }
    });
    var arryTableWrap = document.querySelectorAll(".table-wrap");
    if (arryTableWrap.length != 0) {
      for (var i = 0; i < arryTableWrap.length; i++) {
        var $this = arryTableWrap[i];
        setTimeout(function () {
          _this.scrollTable($this, $this.querySelector(".table-scroll"));
        }, 100);
        $this.querySelector(".table-scroll").addEventListener('scroll', function (e) {
          _this.scrollTable($this, e.target);
        });
      }
    }

    _this.getPageBanners();
    _this.getMenu();
    if (document.querySelector("#index")) {
      _this.getIndexBanners();
    } else if (document.querySelector("#newsList")) {
      _this.getNewsList();
    } else if (document.querySelector("#newsPage")) {
      _this.getNewsPage();
    } else if (document.querySelector("#subscribe1")) {
      setTimeout(function(){
          window.location = _this.domain + "/room.html";
      }, 60000);
    } else if (document.querySelector("#mailList")) {
      _this.getMailList();
    } else if (document.querySelector("#termsList")) {
      _this.getTermsList();
    } else if (document.querySelector("#termsPage")) {
      _this.getTermsPage();
    } else if (document.querySelector("#manualList")) {
      _this.getManualList();
    } else if (document.querySelector("#manualPage")) {
      _this.getManualPage();
    } else if (document.querySelector("#applyList")) {
      _this.getApplyList();
    } else if (document.querySelector("#applyPage")) {
      _this.getApplyPage();
    } else if (document.querySelector("#companyList")) {
      _this.getCompanyList();
    } else if (document.querySelector("#messageList")) {
      _this.getMessageList();
    } else if (document.querySelector("#voteList")) {
      _this.getVoteList();
    } else if (document.querySelector("#votePage")) {
      _this.getVotePage();
    } else if (document.querySelector("#reserveList")) {
      _this.getReserveList();
    } else if (document.querySelector("#reservePage")) {
      _this.getReservePage();
    } else if (document.querySelector("#serviceList")) {
      _this.getServiceList();
    } else if (document.querySelector("#serviceRoom") || document.querySelector("#servicePublic")) {
      _this.isFeedback = true;
    } 
  },
  methods: {
    openMenu: function () {
      this.isMenu = !this.isMenu;
    },
    toTop: function () {
      document.body.scrollTop = 0;
      document.querySelector(".container").scrollTop = 0;
    },
    scrollTable: function ($outerWrap, $scroll) {
      var scrollLeft = $scroll.scrollLeft;
      var scrollWidth = $scroll.clientWidth;
      var tableWidth = $scroll.querySelector("table").clientWidth;
      var limit = tableWidth - scrollWidth;
      if (scrollLeft < limit) {
        $outerWrap.classList.add("scroll");
      } else {
        $outerWrap.classList.remove("scroll");
      }
    },
    getMenu:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/menu.html'
      }).then(function (resp) {
        _this.menu = resp.data.menu;
      });
    },
    menuSubOpen:function(e){
      var $this = e.target;
      $this.nextElementSibling.classList.toggle('active');
    },
    getPageBanners: function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/pageBanner.html'
      }).then(function (resp) {
        _this.pageBanners = resp.data.banners;
      });
    },

    //index
    getIndexBanners:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/indexBanner.html'
      }).then(function (resp) {
        _this.indexBanners = resp.data.banners;
      });
    },

    //news
    getNewsList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/newsList.html'
      }).then(function (resp) {
        _this.newsList = resp.data.newsList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },
    getNewsPage:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/newsPage.html'
      }).then(function (resp) {
        _this.newsPage = resp.data;
        _this.galleryPage = _this.newsPage;
      });
    },
    popupSwiper: function (idx) {
      var _this = this;
      _this.galleryIndex = idx;
      this.$refs.popupSwiper.$swiper.slideTo(idx, 0);
    },

    //mail
    getMailList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/mailList.html'
      }).then(function (resp) {
        _this.mailList = resp.data.mailList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },

    //terms
    getTermsList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/termsList.html'
      }).then(function (resp) {
        _this.termsList = resp.data.termsList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },
    getTermsPage:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/termsPage.html'
      }).then(function (resp) {
        _this.termsPage = resp.data;
        _this.galleryPage = _this.termsPage;
      });
    },


    //manual
    getManualList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/manualList.html'
      }).then(function (resp) {
        _this.manualList = resp.data.manualList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },
    getManualPage:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/manualPage.html'
      }).then(function (resp) {
        _this.manualPage = resp.data;
        _this.galleryPage = _this.manualPage;
      });
    },


    //apply
    getApplyList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/applyList.html'
      }).then(function (resp) {
        _this.applyList = resp.data.applyList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },
    getApplyPage:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/applyPage.html'
      }).then(function (resp) {
        _this.applyPage = resp.data;
        _this.galleryPage = _this.applyPage;
      });
    },
    applySend:function(id){
      var _this=this;
      _this.isFeedback = true;
      /*
      axios({
        methods: 'post',
        url: ''
      }).then(function (resp) {
        _this.isFeedback = true;
      });
      */
    },


    //vote
    getVoteList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/voteList.html'
      }).then(function (resp) {
        _this.voteList = resp.data.voteList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },
    getVotePage:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/votePage.html'
      }).then(function (resp) {
        _this.votePage = resp.data;
        _this.galleryPage = _this.votePage;
      });
    },
    voteSend:function(id, val){
      var _this=this;
      _this.isFeedback = true;
      /*
      axios({
        methods: 'post',
        url: '',
        {id: id, isVote: val}
      }).then(function (resp) {
        _this.isFeedback = true;
      });
      */
    },


    // company
    getCompanyList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/companyList.html'
      }).then(function (resp) {
        _this.companyList = resp.data.companyList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },

    //message
    getMessageList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/messageList.html'
      }).then(function (resp) {
        _this.messageList = resp.data.messageList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },
    replyOpen:function(reply, title){
      var _this = this;
      _this.reply = reply;
      Vue.set(_this.reply, 'title', title);
      _this.isReply = true;
      console.log(_this.reply);

    },
    messageSend:function(){
      var _this=this;
      _this.isFeedback = true;
      console.log(_this.message);
      /*
      axios({
        methods: 'post',
        url: ''
      }, _this.message).then(function (resp) {
        _this.isFeedback = true;
      });
      */
    },

    //reserve
    getReserveList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/reserveList.html'
      }).then(function (resp) {
        _this.reserveList = resp.data.reserveList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },
    getReservePage:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/reservePage.html'
      }).then(function (resp) {
        _this.reservePage = resp.data;
      });
    },

    //service
    getServiceList:function () {
      var _this = this;
      axios({
        methods: 'get',
        url: _this.domain + 'src/api/serviceList.html'
      }).then(function (resp) {
        _this.serviceList = resp.data.serviceList;
        _this.pagination.totle = Math.ceil(resp.data.totle / _this.pagination.length);
        _this.paginationNum();
      });
    },
    filePreview:function (e) {
      var file = e.target.files.item(0);
      this.uploadIndex = Number(e.target.getAttribute('data-index'));
      if(file){
        var reader = new FileReader();
        reader.addEventListener('load',this.imageLoader);
        reader.readAsDataURL(file);
      }else{
        if(this.uploadIndex === 0){
          this.preview1 = "";
        }else if(this.uploadIndex === 1){
          this.preview2 = "";
        }else if(this.uploadIndex === 2){
          this.preview3 = "";
        }
      }
    },
    imageLoader:function (e) {
        if(this.uploadIndex === 0){
          this.preview1 = e.target.result;
        }else if(this.uploadIndex === 1){
          this.preview2 = e.target.result;
        }else if(this.uploadIndex === 2){
          this.preview3 = e.target.result;
        }
    },

    // pagination
    paginationTo:function (idx) {
      var _this = this;
      if (idx <= 0) {
        _this.pagination.active = 1;
      } else if (idx > _this.pagination.totle) {
        _this.pagination.active = _this.pagination.totle;
      } else if (idx >= _this.pagination.page + _this.pagination.per) {
        if (idx + _this.pagination.per > _this.pagination.totle) {
          _this.pagination.page = _this.pagination.totle - _this.pagination.per + 1;
          _this.pagination.active = idx;
        } else {
          _this.pagination.page = idx;
          _this.pagination.active = idx;
        }
      } else if (idx < _this.pagination.per) {
        _this.pagination.page = 1;
        _this.pagination.active = idx;
      } else {
        _this.pagination.active = idx;
      }
    },
    paginationNum:function () {
      var _this = this;
      _this.screenWidth = window.innerWidth;
      if (_this.screenWidth >= 1024 && _this.pagination.totle > 6) {
        _this.pagination.per = 6;
      } else if (_this.screenWidth < 1024 && _this.pagination.totle > 3) {
        _this.pagination.per = 3;
      } else {
        _this.pagination.per = _this.pagination.totle;
      }
    }
  }
});