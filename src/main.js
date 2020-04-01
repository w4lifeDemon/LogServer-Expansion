timeoutID = window.setTimeout(function () {
  if (document.getElementById("helper") !== null && document.getElementById("helper").length != 0) {
    start();
  }
}, 300);

function start() {
  window.clearTimeout(timeoutID);
  var version = "3.6.4",
    version_sure = "3.6.4.28",
    player_id = $("meta[name=ogame-player-id]").attr("content").replace(/\D/g, ""),
    player_name = $("meta[name=ogame-player-name]").attr("content").replace(/\D/g, ""),
    universe = $("meta[name=ogame-universe]").attr("content").replace(/\D/g, ""),
    domain = $("meta[name=ogame-language]").attr("content"),
    lsDomain = localStorage.getItem("lsDomain") ? localStorage.getItem("lsDomain") : "net",
    lsLang = localStorage.getItem("lsLang") ? localStorage.getItem("lsLang") : (domain == "ru" ? "ru" : "en"),
    UvFav = $("#UvFav").length,
    logserverContentLeft = UvFav ? 15 : 44,
    logserverContentSpyLeft = UvFav ? 44 : 73,
    logserverContentExpLeft = UvFav ? 73 : 102,
    gets = ["logserverContent", "logserverContentSpy", "logserverContentAll", "logserverContentSpyAll", "logserverContentExp"],
    arrProcessColor = localStorage.getItem("lsColor") && localStorage.getItem("lsColor").length == 12 ? localStorage.getItem("lsColor") : ["#fff", "#837e78", "#61dd04", "#5566ff", "#910021", "#36a4a7", "#503a2e", "#000000", "#21f3fe", "#c001bc", "#fdab31", "#080d3b"],
    arrProcessKey = ["Ошибка", "Пустая", "Найдены ресурсы", "Найден флот", "Пираты/чужие", "Ускорение", "Замедление", "Чёрная дыра", "Торговец", "Зверушка", "Предмет", "Темная Материя"],
    strProcessColor = '';

  arrProcessKey[21] = "Обломки";

  $.each(arrProcessColor, function (index, value) {
    strProcessColor += '.process' + index + ' {background-color: ' + value + ' !important;}';
    strProcessColor += '.process' + index + ':before {background-color: ' + value + ' !important; background-image: none !important;}';
  });

  $("head").append(
    '<style>'
    + '.icon_nf_logserver {background-image: url("https://logserver.net/plugin/images/logserver.png?v=' + version_sure + '"); background-repeat: no-repeat; display: inline-block; height: 26px; width: 26px;}'
    + '.icon_logserver {background-position: 0 0;} .icon_logserver:hover {background-position: 0 -25px}'
    + '.icon_logserver_cr {background-position: 0 -52px;} .icon_logserver_cr:hover {background-position: 0 -77px}'
    + '.icon_logserver_cr_sl {background-position: 0 -104px;} .icon_logserver_cr_sl:hover {background-position: 0 -130px}'
    + '.icon_logserver_sr {background-position: 0 -77px;} .icon_logserver_sr:hover {background-position: 0 -103px}'
    + '.icon_logserver_rr {background-position: 0 -260px;} .icon_logserver_rr:hover {background-position: 0 -286px}'
    + '.icon_logserver_rr_sl {background-position: 0 -312px;} .icon_logserver_rr_sl:hover {background-position: 0 -338px}'
    + '.icon_logserver_exp {background-position: 0 -365px;} .icon_logserver_exp:hover {background-position: 0 -391px}'
    + '.icon_logserver_exp_err {background-position: 0 -418px;} .icon_logserver_exp_err:hover {background-position: 0 -443px}'
    + '.icon_logserver_exp_pirates {background-position: 0 -469px;} .icon_logserver_exp_pirates:hover {background-position: 0 -495px}'

    + '.abox_text {font-family: "Arial"; font-size: 12px; color: #888888;}'
    + '.abox_text_yellow {font-family: "Arial"; font-size: 12px; color: #aaaa00;}'
    + '.abox_text_red {font-family: "Arial"; font-size: 12px; color: #aa0000;}'
    + '.abox_text_green {font-family: "Arial"; font-size: 12px; color: #00aa00;}'

    + '.lsTable a {text-decoration: none;}'
    + '.lsTable th {background-image: url("//gf3.geo.gfsrv.net/cdne1/d03835718066a5a592a6426736e019.png"); display: table-cell; line-height: 28px; height: 28px; text-align: center;}'
    + '.lsTable td {padding-right: 2px; padding-left: 2px; border: 1px solid #0d1014;}'
    + '.lsTable {color: #848484;}'
    + '.lsTable tr:nth-child(odd) {background-color: #0d1014}'
    + '.lsTable tr:nth-child(even) {background-color: #111a21}'
    + '.lsLoginTable {margin-top: 10px;}'

    + '.tabs_btn_logserver {background: transparent url("https://logserver.net/plugin/images/ls_butt_3.6.4.gif?v=' + version_sure + '") 0 0 no-repeat; background-position-x: 0px; background-position-y: 0px; display: inline; float: left; height: 54px; margin: 0 10px; overflow: visible; position: relative; width: 54px;}'
    + '.tb-tabs-logserver-bat {background-position: 0px 0;}'
    + '.tb-tabs-logserver-bat:hover {background-position: 0px -54px;}'
    + '.tb-tabs-logserver-spy {background-position: -54px 0;}'
    + '.tb-tabs-logserver-spy:hover {background-position: -54px -54px;}'
    + '.tb-tabs-logserver-all-bat {background-position: -108px 0;}'
    + '.tb-tabs-logserver-all-bat:hover {background-position: -108px -54px;}'
    + '.tb-tabs-logserver-all-spy {background-position: -162px 0;}'
    + '.tb-tabs-logserver-all-spy:hover {background-position: -162px -54px;}'
    + '.tb-tabs-logserver-options {background-position: -216px 0;}'
    + '.tb-tabs-logserver-options:hover {background-position: -216px -54px;}'
    + '.tb-tabs-logserver-discord {background-position: -270px 0;}'
    + '.tb-tabs-logserver-discord:hover {background-position: -270px -54px;}'
    + '.tb-tabs-logserver-exp {background-position: -324px 0;}'
    + '.tb-tabs-logserver-exp:hover {background-position: -324px -54px;}'

    + '.icon_nf_link_logserver {height: 26px; width: 26px; margin: 0;}'

    + 'li#EnvoiRC {position: absolute; left: 610px; z-index: 1;}'
    + 'li#EnvoiRC > div {top: 0px !important; left: 1px !important;}'

    + '.lsButtStyle {background: url("https://logserver.net/plugin/images/ls_butt_m.gif?v=' + version_sure + '") no-repeat;}'
    + '#logserverContent {position: absolute; top: 103px; left: ' + logserverContentLeft + 'px; cursor: pointer; width: 27px; height: 27px; background-position: -0px 0px;}'
    + '#logserverContent:hover {background-position: -0px -27px;}'
    + '#logserverContentSpy {position: absolute; top: 103px; left: ' + logserverContentSpyLeft + 'px; cursor: pointer; width: 27px; height: 27px; background-position: -27px 0px;}'
    + '#logserverContentSpy:hover {background-position: -27px -27px;}'
    + '#logserverContentExp {position: absolute; top: 103px; left: ' + logserverContentExpLeft + 'px; cursor: pointer; width: 27px; height: 27px; background-position: -162px 0px;}'
    + '#logserverContentExp:hover {background-position: -162px -27px;}'

    + '#lsContent {position: relative; z-index: 2; margin-top: 2px; margin-bottom: 5px; width: 650px; margin-left: 10px; background-color: #0d1014; border: 1px solid #000000; float: left;}'
    + '.tabContent {padding: 0 10px 0;}'
    + '#lsHeader {background: url(//gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif); no-repeat 0 0 #0d1014;}'
    + '#lsTitle {padding: 0; text-align: center; color: #6f9fc8; font-size: 13px; font-weight: 700; height: 28px; line-height: 28px;}'

    + '.lsLogout {color: #ff9600; position: absolute; font-size: 10px; font-style: italic; font-weight: 200; padding-left: 30px; cursor: pointer}'

    + '#tabs-logserver-options {position: relative; left: 266px;}'
    + '.col-pic-item{float:left;width:15px;height:15px;border:solid 1px #FFF;margin:0}.col-pic-picker{width:50px;height:50px;border:solid 2px #666}.col-pic-item:hover{border:solid 1px #0F0}.col-pic-palette{width:306px;border:solid 2px #666}.col-safe-item{float:left;width:40px;height:40px;border:solid 1px #FFF;margin:0}.col-safe-picker{width:50px;height:50px;border:solid 2px #666}.col-safe-item:hover{border:solid 1px #0F0}.col-safe-palette{width:210px;border:solid 2px #666}.col-pic-closer,.col-safe-closer{display:block;position:absolute;right:-12px;top:-12px;background:#fff;width:20px;height:20px;text-align:center;line-height:16px;border-radius:10px;text-decoration:none;color:#fff;background:#000}'
    + strProcessColor
    + '</style>'
  );

  var $gameTop = $("#top").length ? $("#top") : $("#info"),
    $gameContent = $("#middle").length ? $("#middle") : $("#content");

  $gameTop.append(
    '<div id="logserverContent" get="logserverContent" lsVis="' + $gameContent.attr("id") + '" class="lsButt lsButtStyle"></div>'
    + '<div id="logserverContentSpy" get="logserverContentSpy" lsVis="' + $gameContent.attr("id") + '" class="lsButt lsButtStyle"></div>'
    + '<div id="logserverContentExp" get="logserverContentExp" lsVis="' + $gameContent.attr("id") + '" class="lsButt lsButtStyle"></div>'
  );

  $gameContent.after('<div id="lsContent" style="display: none"></div>');

  $("#lsContent").on("click", ".lsButt", function () {
    lsContent($(this).attr("get"));
  });
  $(".lsButt").on("click", function () {
    lsContentVisible($(this).attr("get"), $(this).attr("lsVis"));
  });

  function lsContentVisible(n, s) {
    $("." + n).is(":visible") ? ($("#" + s).show(),
      $("#lsContent").hide()) : (lsContent(n), $("#" + s).hide(),
      $("#lsContent").show())
  }

  function lsContent(id) {
    var html = "";
    if (localStorage.getItem('lsId') && gets.indexOf(id) != -1) {
      fStrShow(id, 'https://logserver.' + lsDomain + '/api/api.php?act=' + id + '&v=' + version + '&id=' + localStorage.getItem('lsId'))
    } else if (id == "logserverOptions") {
      lsContentHTML(id, fStrSettings());
    } else if (id == "logserverDiscord") {
      lsContentHTML(id, fStrDiscord());
    } else {
      lsContentHTML(id, fStrLogin());
    }
  }

  function lsContentHTML(id, html) {
    var strShow = "";
    strShow += "<div class='" + id + " lsContent'>";
    strShow += lsContentHeader();
    strShow += lsMenu(id);
    strShow += "    <div class='tabContent'>";
    strShow += "        <div class='tabs_wrap'>";
    strShow += "            <div class='tab_ctn'>";
    strShow += html;
    strShow += "            </div>";
    strShow += "        </div>";
    strShow += "    </div>";
    strShow += "</div>";
    $("#lsContent").html(strShow);
  }

  var arrNameFleet = [];
  arrNameFleet[204] = "Лёгкий истребитель";
  arrNameFleet[204] = "Лёгкий истребитель";
  arrNameFleet[205] = "Тяжёлый истребитель";
  arrNameFleet[206] = "Крейсер";
  arrNameFleet[207] = "Линкор";
  arrNameFleet[215] = "Линейный крейсер";
  arrNameFleet[211] = "Бомбардировщик";
  arrNameFleet[213] = "Уничтожитель";
  arrNameFleet[214] = "Звезда смерти";
  arrNameFleet[218] = "Жнец";
  arrNameFleet[219] = "Первопроходец";
  arrNameFleet[202] = "Малый транспорт";
  arrNameFleet[203] = "Большой транспорт";
  arrNameFleet[208] = "Колонизатор";
  arrNameFleet[209] = "Переработчик";
  arrNameFleet[210] = "Шпионский зонд";
  arrNameFleet[212] = "Солнечный спутник";
  arrNameFleet[217] = "Гусеничник";

  var arrLang = {
    "en": {
      "LogServer_plugin": "LogServer." + lsDomain + " plugin",
      "upload_form": "upload form",
      "debris_att": "Attacker debris",
      "debris_def": "Defense debris",
      "Recycler_report": "Recycler report:",
      "Comment": "Comment:",
      "Planet_clean_up": "Planet clean-up:",
      "Public_log": "Public log",
      "Hide_coordinates": "Hide coordinates",
      "Hide_technologies": "Hide technologies",
      "Hide_time": "Hide Time",
      "Hide_Comments": "Ban Comments",
      "Calculate_IPMs": "Calculate IPMs:",
      "Calc_deuterium": "Calc. deuterium consumption",
      "Universe": "Universe",
      "Upload": "Upload",

      "LS_title": "LogServer.net GM " + version + " script",
      "LS_login": "Login",
      "LS_logout": "Logout",
      "LS_pass": "Password",
      "LS_reg": "Registration",
      "LS_f_p": "Forgot Password?",
      "LS_sett": "Settings",
      "LS_lang": "Language",
      "LS_server": "Server",
      "LS_save": "Save",
      "LS_wl_ow_p": "Wrong login or password!",
      "LS_not_l": "Not Login!",
      "LS_not_p": "Not Password!",

      "my_battles": "My Battles",
      "spy_report": "Spy Report",
      "alliance_battles": "Alliance Battles",
      "alliance_spy": "Alliance Spy",
      "discord": "Discord",
      "menu_exp": "Exp",

      "lang_table_date": "Date",
      "lang_table_title": "Title",
      "lang_table_losses": "Losses",
      "lang_table_uni": "Uni",
      "lang_table_lang": "Lang",
      "lang_table_public": "Pub",
      "lang_table_del": "Del",
      "lang_table_edit": "Edit",

      "lang_table_moon": "M",
      "lang_table_core": "Core",
      "lang_table_name": "Name P/M",
      "lang_table_player": "Player",
      "lang_table_resurs": "Resurs",
      "lang_table_fleet": "Fleet",
      "lang_table_actions": "Actions",

      "day": "Day",
      "week": "Week",
      "all": "All",
      "resurs": "resurs",
      "fleet": "fleet",
      "derbis": "derbis",
    },
    "ru": {
      "LogServer_plugin": "LogServer." + lsDomain + " плагин",
      "upload_form": "форма загрузки",
      "debris_att": "Обломки Атакера",
      "debris_def": "Обломки Дефа",
      "Recycler_report": "Доклад переработчиков:",
      "Comment": "Комментарий:",
      "Planet_clean_up": "Зачистка планеты:",
      "Public_log": "Публичный лог",
      "Hide_coordinates": "Скрыть координаты",
      "Hide_technologies": "Скрыть технологии",
      "Hide_time": "Скрыть время",
      "Hide_Comments": "Запрет комментариев",
      "Calculate_IPMs": "Учесть МПР:",
      "Calc_deuterium": "Рассчитать потр. дейтерия",
      "Universe": "Вселенная",
      "Upload": "Загрузить",

      "LS_title": "Cкрипт LogServer.net GM " + version,
      "LS_login": "Логин",
      "LS_logout": "Выход",
      "LS_pass": "Пароль",
      "LS_reg": "Регистрация",
      "LS_f_p": "Забыли пароль?",
      "LS_sett": "Настройки",
      "LS_lang": "Язык",
      "LS_server": "Сервер",
      "LS_save": "Сохранить",
      "LS_wl_ow_p": "Неправильный логин или пароль!",
      "LS_not_l": "Введите логин!",
      "LS_not_p": "Введите пароль!",

      "my_battles": "Боевые",
      "spy_report": "Шпионские",
      "alliance_battles": "Ал боев.",
      "alliance_spy": "Ал шпион.",
      "discord": "Дискорд",
      "menu_exp": "Экспа",

      "lang_table_date": "Дата",
      "lang_table_title": "Название",
      "lang_table_losses": "Потери",
      "lang_table_uni": "Вселен",
      "lang_table_lang": "Домен",
      "lang_table_public": "Публ",
      "lang_table_del": "Удал",
      "lang_table_edit": "Редак",

      "lang_table_moon": "Л",
      "lang_table_core": "Коор",
      "lang_table_name": "Назв П/Л",
      "lang_table_player": "Игрок",
      "lang_table_resurs": "Ресурсы",
      "lang_table_fleet": "Флот",
      "lang_table_actions": "Действия",

      "day": "День",
      "week": "Неделя",
      "all": "Всего",
      "resurs": "ресурсы",
      "fleet": "флот",
      "derbis": "поле обломков",
    }
  };

  var strLogServerURL = "https://logserver." + lsDomain + "/index.php";

  function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
      offset = cookie.indexOf(search);
      if (offset != -1) {
        offset += search.length;
        end = cookie.indexOf(";", offset)
        if (end == -1) {
          end = cookie.length;
        }
        setStr = unescape(cookie.substring(offset, end));
      }
    }
    return (setStr);
  }

  function ShowCombatreport(strCRCode, idCRCode) {
    var year = new Date().getFullYear() + 1;
    var strUploadDiv = "";
    strUploadDiv += "<form class='" + idCRCode + "' action='" + strLogServerURL + "' method='post' target='_blank'>";
    strUploadDiv += "<input type='hidden' name='plugin' value='1'>";
    strUploadDiv += "<input type='hidden' name='plugin_user_key' value='" + localStorage.getItem('lsId') + "'>";
    strUploadDiv += "<center>";
    strUploadDiv += "   <table>";
    strUploadDiv += "       <tr>";
    strUploadDiv += "           <center><font color='#00DD00'><b>LogServer." + lsDomain + " " + arrLang[lsLang]["upload_form"] + "</b></font></center>";
    strUploadDiv += "       </tr>";
    strUploadDiv += "       <tr>";
    strUploadDiv += "           <td align='center'>";
    strUploadDiv += "               <textarea rows='8' name='log_textarea' cols='156' style='display: none; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;'>" + strCRCode + "</textarea>";
    strUploadDiv += "               <input name='rb_rec_report' value='V1' checked type='radio'>" + arrLang[lsLang]["debris_att"] + "&nbsp;<input name='rb_rec_report' value='V2' type='radio'>" + arrLang[lsLang]["debris_def"] + "";
    var arrRR = (localStorage.getItem("rr_code")) ? localStorage.getItem("rr_code") : [];
    var strChecked = getCookie("cbx_recycler");
    if (strChecked == "false" || arrRR.length > 0) {
      strChecked = "";
      var strDisplay = "";
    } else {
      strChecked = "checked";
      strDisplay = "none";
    }
    strUploadDiv += "               <input id=\"cbx_recycler\" name=\"cbx_recycler\" value=\"ON\" " + strChecked + " onclick=\"if(!this.checked){document.getElementById('inputs_" + strCRCode + "_recycler').style.display=''} else {document.getElementById('inputs_" + strCRCode + "_recycler').style.display='none'};\" onchange='document.cookie=\"cbx_recycler=\"+this.checked+\"; expires=Monday, 01-Nov-" + year + " 10:0:0 GMT\"' type=\"checkbox\">Всё поле обломков переработано<br>";

    strUploadDiv += "               <table id=\"inputs_" + strCRCode + "_recycler\" style=\"border-collapse: collapse; display:" + strDisplay + "\">";
    strUploadDiv += "                   <tr><td style='width: 484px;'><font face='Arial' color='#888888' size='2'>" + arrLang[lsLang]["Recycler_report"] + "</font></td><td><img class='recycler_textarea_add' src='https://logserver.net/index_files/ico/add.png'></td></tr>";

    if (arrRR.length > 0) arrRR.forEach(function (item, i, arr) {
      strUploadDiv += "                   <tr id='tr_recycler_textarea_" + item + "'><td><input name=\"recycler_textarea[]\" onfocus=\"if(this.value=='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"" + item + "\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td><td><img class='recycler_textarea_close' idCode='" + item + "' src='https://logserver.net/index_files/ico/close.png'></td></tr>";
    });
    else strUploadDiv += "                   <tr><td colspan='2'><input name=\"recycler_textarea[]\" onfocus=\"if(this.value=='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td></tr>";
    strUploadDiv += "               </table>";

    strUploadDiv += "               <table id=\"clean_up_textarea_" + strCRCode + "\" style=\"border-collapse: collapse\">";
    strUploadDiv += "                   <tr><td style='width: 484px;'><font face='Arial' color='#888888' size='2'>" + arrLang[lsLang]["Planet_clean_up"] + "</font></td><td><img class='clean_up_textarea_add' src='https://logserver.net/index_files/ico/add.png'></td></tr>";

    var arrCR = (localStorage.getItem("cr_code")) ? localStorage.getItem("cr_code") : [];
    if (arrCR.length > 0) arrCR.forEach(function (item, i, arr) {
      if (strCRCode != item) strUploadDiv += "                   <tr id='tr_clean_up_" + item + "'><td><input name=\"clean_up_textarea[]\" onfocus=\"if(this.value=='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"" + item + "\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td><td><img class='clean_up_textarea_close' idCode='" + item + "' src='https://logserver.net/index_files/ico/close.png'></td></tr>";
    });
    else strUploadDiv += "                   <tr><td colspan='2'><input name=\"clean_up_textarea[]\" onfocus=\"if(this.value=='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td></tr>";
    strUploadDiv += "               </table>";

    strUploadDiv += "               <table style=\"border-collapse: collapse\">";
    strUploadDiv += "                   <tr><td><font face='Arial' color='#888888' size='2'>" + arrLang[lsLang]["Comment"] + "</font></td></tr>";
    strUploadDiv += "                   <tr><td><textarea rows='2' name='comment_textarea' cols='160' style='width: 500px; min-height: 20px; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;' onclick='this.setAttribute(\"rows\", 4);'></textarea></td></tr>";
    strUploadDiv += "               </table>";
    strUploadDiv += "           </td>";
    strUploadDiv += "       </tr>";

    strChecked = getCookie("index_cbx_public");
    if (strChecked == "false") strChecked = ""
    else strChecked = "checked";
    var strCheckBoxes = "                           <input type='checkbox' name='cbx_public' value='ON' " + strChecked + " onchange='document.cookie=\"index_cbx_public=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[lsLang]["Public_log"] + "</font><br>";
    strChecked = getCookie("index_cbx_hide_coord");
    if (strChecked == "false") strChecked = ""
    else strChecked = "checked";
    strCheckBoxes += "                          <input type='checkbox' name='cbx_hide_coord' value='ON' " + strChecked + " onchange='document.cookie=\"index_cbx_hide_coord=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[lsLang]["Hide_coordinates"] + "</font><br>";
    strChecked = getCookie("index_hide_tech");
    if (strChecked == "false") strChecked = ""
    else strChecked = "checked";
    strCheckBoxes += "                          <input type='checkbox' name='cbx_hide_tech' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_tech=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[lsLang]["Hide_technologies"] + "</font><br>";
    strChecked = getCookie("index_hide_tech");
    if (strChecked == "false") strChecked = ""
    else strChecked = "checked";
    strCheckBoxes += "                          <input type='checkbox' name='cbx_hide_time' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_time=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[lsLang]["Hide_time"] + "</font><br>";
    strChecked = getCookie("index_hide_comments");
    if (strChecked == "false") strChecked = ""
    else strChecked = "checked";
    strCheckBoxes += "                          <input type='checkbox' name='cbx_comments' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_comments=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[lsLang]["Hide_Comments"] + "</font><input type=hidden name='submited' value='1'>";

    var strListBoxes = "                            <table border='1' style='border-collapse: collapse' cellpadding='2'><tr>";

    strListBoxes += "                                                   <tr height='4'><td></td><td width='4'></td><td></td></tr><tr><td>";
    strListBoxes += "                                                   <select size='1' name='select_skin' style='font-size: 10px; width: 120px; visibility: visible;'>";
    strListBoxes += "                                                       <option value='logserver_v20' selected>Skin: LogServer v2</option>";
    strListBoxes += "                                                       <option value='0'>Default</option>";
    strListBoxes += "                                                       <option value='original'>Original</option>";
    strListBoxes += "                                                       <option value='abstract'>Abstract</option>";
    strListBoxes += "                                                       <option value='animex'>AnimeX</option>";
    strListBoxes += "                                                       <option value='animex_2'>AnimeX 2</option>";
    strListBoxes += "                                                       <option value='chaos'>Chaos</option>";
    strListBoxes += "                                                       <option value='destroyer'>Destroyer</option>";
    strListBoxes += "                                                       <option value='fallout'>Fallout</option>";
    strListBoxes += "                                                       <option value='dead_space'>Dead Space</option>";
    strListBoxes += "                                                       <option value='ntrvr'>?ntrvr[!]</option>";
    strListBoxes += "                                                       <option value='disturbed'>Disturbed</option>";
    strListBoxes += "                                                       <option value='staticx'>Static-X</option>";
    strListBoxes += "                                                       <option value='system_shock'>System shock</option>";
    strListBoxes += "                                                       <option value='bender'>Bender</option>";
    strListBoxes += "                                                   </select>";
    strListBoxes += "                                                   <td></td></td";
    strListBoxes += "                                                   </td></tr></table>";

    strUploadDiv += "       <tr>";
    strUploadDiv += "                                   <td align='left'>";
    strUploadDiv += "                                       <table border='1' style='border-collapse: collapse' >";
    strUploadDiv += "                                           <tr>";
    strUploadDiv += "                                               <td align='left' valign='top'>";
    strUploadDiv += strCheckBoxes;
    strUploadDiv += "                                               </td>";
    strUploadDiv += "                                               <td width='10'></td>";
    strUploadDiv += "                                               <td align='right' valign='top'>";
    strUploadDiv += "                                                   <div id='exsettings' style='display: block;'>";
    strUploadDiv += "                                                       <table border='1' style='border-collapse: collapse'>";
    strUploadDiv += "                                                           <tr>";
    strUploadDiv += "                                                               <td>";
    strUploadDiv += "                                                                   <input type='checkbox' name='cbx_ipm' value='ON' onchange='(this.checked) ? (document.getElementById(\"text_ipm\").disabled = false) : (document.getElementById(\"text_ipm\").disabled = true)'><font color='#888888' face='Arial' size='2'>" + arrLang[lsLang]["Calculate_IPMs"] + " </font>";
    strUploadDiv += "                                                                   <input disabled type='text' id='text_ipm' name='text_ipm' size='5' value='' style='width: 20; font-size: 12px; font-family: Arial; color: #000000; background-color: #ffffff; border: 1px solid #888888;'>";
    strUploadDiv += "                                                                   <br>";
    strChecked = getCookie("index_hide_fuel");
    if (strChecked == "false") strChecked = ""
    else strChecked = "checked";
    strUploadDiv += "                                                                   <input type='checkbox' name='cbx_fuel' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_fuel=\"+this.checked+\"; expires=Monday, 01-Sep-" + year + " 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + arrLang[lsLang]["Calc_deuterium"] + "<br>(<select size='1' name='select_p_fuel' style='font-size: 10px; visibility: visible;'><option value='1'>100%</option> <option value='0.9'>90%</option> <option value='0.8'>80%</option> <option value='0.7'>70%</option> <option value='0.6'>60%</option> <option value='0.5'>50%</option> <option value='0.4'>40%</option> <option value='0.3'>30%</option> <option value='0.2'>20%</option> <option value='0.1'>10%</option> </select>)</font>";
    strUploadDiv += "                                                               </td>";
    strUploadDiv += "                                                               <td width='10'></td>";
    strUploadDiv += "                                                               <td>";
    strUploadDiv += strListBoxes;
    strUploadDiv += "                                                               </td>";
    strUploadDiv += "                                                           </tr>";
    strUploadDiv += "                                                       </table>";
    strUploadDiv += "                                                   </div>";
    strUploadDiv += "                                               </td>";
    strUploadDiv += "                                           </tr>";
    strUploadDiv += "                                       </table>";
    strUploadDiv += "                                   </td>";
    strUploadDiv += "                               </tr>";

    strUploadDiv += "       <tr>";
    strUploadDiv += "           <td class='btn_" + idCRCode + "' style='text-align:center'>";
    strUploadDiv += "                   <input id='send_" + idCRCode + "' class='btn_blue' idform='" + idCRCode + "' type='button' value='" + arrLang[lsLang]["Upload"] + "' name='submit'>";
    strUploadDiv += "           </td>";
    strUploadDiv += "       </tr>";
    strUploadDiv += "   </table>";
    strUploadDiv += "</center>";
    strUploadDiv += "</form>";
    return strUploadDiv;
  }


  function ShowMSGreport(strSRCode, idSRCode) {
    var strUploadDiv = "";
    strUploadDiv += "<form class='" + idSRCode + "' action='" + strLogServerURL + "' method='post' target='_blank'>";
    strUploadDiv += "<input type='hidden' name='plugin' value='2'>";
    strUploadDiv += "<input type='hidden' name='plugin_user_key' value='" + localStorage.getItem('lsId') + "'>";
    strUploadDiv += "<center>";
    strUploadDiv += "   <table>";
    strUploadDiv += "       <tr>";
    strUploadDiv += "           <center><font color='#00DD00'><b>LogServer." + lsDomain + " " + arrLang[lsLang]["upload_form"] + "</b></font></center>";
    strUploadDiv += "       </tr>";
    strUploadDiv += "       <tr>";
    strUploadDiv += "           <td align='center'>";
    strUploadDiv += "               <textarea rows='8' name='log_textarea' cols='156' style='display: none; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;'>" + strSRCode + "</textarea>";
    strUploadDiv += "               <input type='hidden' name='rb_spy_report' value='V2' checked type='radio'>";
    strUploadDiv += "           </td>";
    strUploadDiv += "       </tr>";

    strUploadDiv += "       <tr>";
    strUploadDiv += "           <td class='btn_" + idSRCode + "' style='text-align:center'>";
    strUploadDiv += "                   <input type=hidden name='submited' value='1'>";
    strUploadDiv += "           </td>";
    strUploadDiv += "       </tr>";
    strUploadDiv += "   </table>";
    strUploadDiv += "</center>";
    strUploadDiv += "</form>";

    return strUploadDiv;
  }

  var intervalCR = 0;
  var intervalSR = 0;
  var intervalRR = 0;
  var intervalEXP = 0;

  $(document).ajaxComplete(function (event, xhr, settings) {
    var msg;
    //боевые
    if (settings.url === "index.php?page=messages&tab=21&ajax=1"
      || /tabid=21/.test(settings.data)
      || settings.url === "index.php?page=messages&tab=12&ajax=1"
      || /tabid=12/.test(settings.data)
    ) {
      if (settings.url === "index.php?page=messages&tab=21&ajax=1" || /tabid=21/.test(settings.data)) msg = "#ui-id-18 .msg";
      if (settings.url === "index.php?page=messages&tab=12&ajax=1" || /tabid=12/.test(settings.data)) msg = "#ui-id-38 .msg";
      $(msg).removeClass("upload_div");
      intervalCR = window.setInterval(function (thisObj) {
        if (!document.getElementsByClassName("upload_div")[0]) {
          $(msg).each(function (i, elem) {
            $(elem).addClass("upload_div");
            if (/cr-/.test($(elem).find(".icon_apikey").filter(":first").attr("title"))) {
              var strCode = /cr-[a-z]{2}-[0-9]+-[0-9a-z]+/.exec($(elem).find(".icon_apikey").filter(":first").attr("title"))[0];
              var idCode = 'logserver_' + strCode + '_combat';

              var arr = (localStorage.getItem("cr_code")) ? localStorage.getItem("cr_code") : [];

              var style = (arr.indexOf(strCode) != -1) ? "icon_logserver_cr_sl" : "icon_logserver_cr";
              $(elem).find(".msg_actions").filter(":first").append("<span id='save_" + idCode + "' class='icon_nf_logserver " + style + " tooltip' code='" + strCode + "'></span>");

              $(elem).find(".msg_actions").filter(":first").append("<span id='get_form_" + strCode + "' code='" + strCode + "' class='icon_nf_logserver icon_logserver tooltip'></span>");
              $(elem).append("<div id='" + idCode + "' style='display:none'></div>");

              $("#get_form_" + strCode).on("click", function () {
                var code = $(this).attr("code");
                var idCode = 'logserver_' + code + '_combat';
                $("#" + idCode).show();
                $("#" + idCode).html(ShowCombatreport(strCode, idCode));

                $("table#inputs_" + strCode + "_recycler img.recycler_textarea_add").on("click", function () {
                  $("table#inputs_" + strCode + "_recycler").append("<tr><td><input name=\"recycler_textarea[]\" onfocus=\"if(this.value=='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"rr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td></tr>");
                });

                $("table#clean_up_textarea_" + strCode + " img.clean_up_textarea_add").on("click", function () {
                  $("table#clean_up_textarea_" + strCode).append("<tr class='clean_up_textarea'><td><input name=\"clean_up_textarea[]\" onfocus=\"if(this.value=='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') this.value='';\" onblur=\"if (this.value=='') this.value='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; if(this.value && this.value!='cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')\" value=\"cr-xx-xxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\" style=\"width: 484px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);\" onmouseover=\"this.style.border='1px solid #0099bb'\" onmouseout=\"this.style.border='1px solid #888888'\"></td></tr>");
                });

                $("table#inputs_" + strCode + "_recycler img.recycler_textarea_close").on("click", function () {
                  $("tr#tr_recycler_textarea_" + $(this).attr("idCode")).html("");
                });

                $("table#clean_up_textarea_" + strCode + " img.clean_up_textarea_close").on("click", function () {
                  $("tr#tr_clean_up_" + $(this).attr("idCode")).html("");
                });

                $("#send_" + idCode).on("click", function () {
                  var btn = $(this);
                  var idCode = btn.attr("idform");
                  btn.val("loading");

                  GM_xmlhttpRequest({
                    method: "POST",
                    url: $("form." + idCode).attr("action"),
                    data: $("form." + idCode).serialize(),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function (response) {
                      if (response) var result = jQuery.parseJSON(response.responseText.trim());
                      $(".btn_" + idCode).html("<table>");
                      $(".btn_" + idCode).append("<tr>");
                      $(".btn_" + idCode).append("<td style='text-align: left'><input value='" + result["url"] + "' onclick='this.select();' style='width: 500px; text-align: left; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);'></td>");
                      $(".btn_" + idCode).append("<td><input value='>>' class='btn_blue' type='button' style='height: 15px; padding: 0px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial;' onclick='window.open(\"" + result["url"] + "\");'></td>");
                      $(".btn_" + idCode).append("</tr>");
                      if (result["bbcode"]) $(".btn_" + idCode).append("<tr>");
                      if (result["bbcode"]) $(".btn_" + idCode).append("<td><input id='bbcode_" + idCode + "' value='" + result["bbcode"] + "' onclick='this.select();' style='width: 500px; text-align: left; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);'></td>");
                      if (result["bbcode"]) $(".btn_" + idCode).append("<td><input value='Copy' class='btn_blue' type='button' style='height: 15px; padding: 0px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial;' onclick='document.getElementById(\"bbcode_" + idCode + "\").select(); document.execCommand(\"copy\");'></td>");
                      if (result["bbcode"]) $(".btn_" + idCode).append("</tr>");
                      $(".btn_" + idCode).append("</table>");
                    }
                  });
                  var arr = [];
                  GM_setValue("cr_code", arr);
                  GM_setValue("rr_code", arr);
                });
              });

              $("#save_" + idCode).on("click", function () {
                var arr = (localStorage.getItem("cr_code")) ? localStorage.getItem("cr_code") : [];
                var code = $(this).attr("code");

                if ($(this).is(".icon_logserver_cr")) {
                  $(this).addClass("icon_logserver_cr_sl");
                  $(this).removeClass("icon_logserver_cr");
                  if (arr.indexOf(code) == -1) {
                    arr.push(code);
                    GM_setValue("cr_code", arr);
                  }
                } else {
                  $(this).addClass("icon_logserver_cr");
                  $(this).removeClass("icon_logserver_cr_sl");
                  arr = jQuery.grep(arr, function (v) {
                    return v != code;
                  });
                  GM_setValue("cr_code", arr);
                }
              });
            } else {
              if (settings.url === "index.php?page=messages&tab=21&ajax=1" || /tabid=21/.test(settings.data)) {
                var msg_action_link = $(elem).find(".msg_action_link").attr("href");
                var msg_id = $(elem).attr("data-msg-id");
                if (msg_action_link) {
                  if (!localStorage.getItem(universe + "_" + domain + "_" + msg_id)) {
                    $.ajax({
                      url: msg_action_link,
                      success: function (data) {
                        var textData = $(data).find("script").filter(":first").text();
                        var from = textData.search(/\(/) + 2;
                        var to = textData.search(/\);/) - 1;
                        var jsonData = textData.substring(from, to);
                        GM_xmlhttpRequest({
                          method: "POST",
                          url: 'https://logserver.' + lsDomain + '/api/exp.php?act=pirates',
                          data: 'v=' + version
                            + '&msg_id=' + msg_id
                            + '&player_id=' + player_id
                            + '&universe=' + universe
                            + '&domain=' + domain
                            + '&date=' + $(elem).find(".msg_date").text()
                            + '&content=' + jsonData
                            + '&id=' + localStorage.getItem('lsId'),
                          headers: {"Content-Type": "application/x-www-form-urlencoded"},
                          onload: function () {
                            GM_setValue(universe + "_" + domain + "_" + msg_id, "4");
                          }
                        });
                      }
                    });
                  }
                  $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver icon_logserver_exp_pirates tooltip'></span>");
                  $(elem).find(".msg_status").addClass("process4");
                }
              }
            }
          });
        } else window.clearInterval(intervalCR);
      }, 500, this);
    }
    //шпионаж
    if (settings.url === "index.php?page=messages&tab=20&ajax=1"
      || /tabid=20/.test(settings.data)
      || settings.url === "index.php?page=messages&tab=11&ajax=1"
      || /tabid=11/.test(settings.data)
    ) {
      if (settings.url === "index.php?page=messages&tab=20&ajax=1" || /tabid=20/.test(settings.data)) msg = "#ui-id-16 .msg";
      if (settings.url === "index.php?page=messages&tab=11&ajax=1" || /tabid=11/.test(settings.data)) msg = "#ui-id-40 .msg";
      $(msg).removeClass("upload_msg_div");
      intervalSR = window.setInterval(function (thisObj) {
        if (!document.getElementsByClassName("upload_msg_div")[0]) {
          $(msg).each(function (i, elem) {
            $(elem).addClass("upload_msg_div");
            if (/sr-/.test($(elem).find(".icon_apikey").filter(":first").attr("title"))) {
              var strCode = /sr-[a-z]{2}-[0-9]+-[0-9a-z]+/.exec($(elem).find(".icon_apikey").filter(":first").attr("title"))[0];
              var idCode = 'logserver_' + strCode + '_combat';

              $(elem).find(".msg_actions").filter(":first").append("<span id='send_" + idCode + "' class='icon_nf_logserver icon_logserver tooltip' title='" + arrLang[lsLang]["LogServer_plugin"] + "' idform='" + idCode + "'></span>");
              $(elem).append("<div id='" + idCode + "' style='display:none'>" + ShowMSGreport(strCode, idCode) + "</div>");

              $(".icon_logserver_sr").on("click", function () {

              });

              $("#send_" + idCode).on("click", function () {
                var btn = $(this);
                var idCode = btn.attr("idform");
                $("#" + idCode).show();

                GM_xmlhttpRequest({
                  method: "POST",
                  url: $("form." + idCode).attr("action"),
                  data: $("form." + idCode).serialize(),
                  headers: {"Content-Type": "application/x-www-form-urlencoded"},
                  onload: function (response) {
                    if (response) var result = jQuery.parseJSON(response.responseText.trim());
                    $(".btn_" + idCode).html("<input value='" + result["url"] + "' onclick='this.select();' style='width: 500px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);'> <input value='>>' class='btn_blue' type='button' style='height: 15px; padding: 0px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial;' onclick='window.open(\"" + result["url"] + "\");'>");
                    if (result["bbcode"]) $(".btn_" + idCode).append("<br><input value='" + result["bbcode"] + "' onclick='this.select();' style='width: 500px; text-align: center; border-radius: 10px 10px 0px; font-size: 10px; font-family: Arial; color: rgb(136, 136, 136); background-color: rgb(0, 0, 0); border: 1px solid rgb(136, 136, 136);'>");
                  }
                });
              });
            }
          });
        } else window.clearInterval(intervalSR);
      }, 500, this);
    }
    //прочее
    if (settings.url === "index.php?page=messages&tab=24&ajax=1"
      || /tabid=24/.test(settings.data)
    ) {
      $("#ui-id-24 .msg").removeClass("upload_rr_div");
      intervalRR = window.setInterval(function (thisObj) {
        if (!document.getElementsByClassName("upload_rr_div")[0]) {
          $("#ui-id-24 .msg").each(function (i, elem) {
            $(elem).addClass("upload_rr_div");
            if (/rr-/.test($(elem).find(".icon_apikey").filter(":first").attr("title"))) {
              var strCode = /rr-[a-z]{2}-[0-9]+-[0-9a-z]+/.exec($(elem).find(".icon_apikey").filter(":first").attr("title"))[0];
              var idCode = 'logserver_' + strCode + '_combat';

              var arr = (localStorage.getItem("rr_code")) ? localStorage.getItem("rr_code") : [];

              var style = (arr.indexOf(strCode) != -1) ? "icon_logserver_rr_sl" : "icon_logserver_rr";
              $(elem).find(".msg_actions").filter(":first").append("<span id='save_" + idCode + "' class='icon_nf_logserver " + style + " tooltip' code='" + strCode + "'></span>");

              var msg_id = $(elem).attr("data-msg-id");
              if (getUrlVars($(elem).find(".msg_content").find("a").attr("href")).position == 16) {
                if (!localStorage.getItem(universe + "_" + domain + "_" + msg_id)) {
                  GM_xmlhttpRequest({
                    method: "POST",
                    url: 'https://logserver.' + lsDomain + '/api/exp.php?act=debris',
                    data: 'v=' + version
                      + '&msg_id=' + msg_id
                      + '&player_id=' + player_id
                      + '&universe=' + universe
                      + '&domain=' + domain
                      + '&date=' + $(elem).find(".msg_date").text()
                      + '&content=' + strCode
                      + '&id=' + localStorage.getItem('lsId'),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function (response) {
                      GM_setValue(universe + "_" + domain + "_" + msg_id, "21");
                      $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver icon_logserver_exp_pirates tooltip'></span>");
                    }
                  });
                } else {
                  $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver icon_logserver_exp_pirates tooltip'></span>");
                }
              }

              $("#save_" + idCode).on("click", function () {
                var arr = (localStorage.getItem("rr_code")) ? localStorage.getItem("rr_code") : [];
                var code = $(this).attr("code");

                if ($(this).is(".icon_logserver_rr")) {
                  $(this).addClass("icon_logserver_rr_sl");
                  $(this).removeClass("icon_logserver_rr");
                  if (arr.indexOf(code) == -1) {
                    arr.push(code);
                    GM_setValue("rr_code", arr);
                  }
                } else {
                  $(this).addClass("icon_logserver_rr");
                  $(this).removeClass("icon_logserver_rr_sl");
                  arr = jQuery.grep(arr, function (v) {
                    return v != code;
                  });
                  GM_setValue("rr_code", arr);
                }
              });
            }
          });
        } else window.clearInterval(intervalRR);
      }, 500, this);
    }
    //экспы
    if (settings.url === "index.php?page=messages&tab=22&ajax=1"
      || /tabid=22/.test(settings.data)
    ) {
      $("#ui-id-20 .msg").removeClass("upload_exp_div");
      if (!localStorage.getItem(universe + "_" + domain + "_ls_exp"))
        intervalEXP = window.setInterval(function (thisObj) {
          if (!document.getElementsByClassName("upload_exp_div")[0]) {
            $("#ui-id-20 .msg").each(function (i, elem) {
              $(elem).addClass("upload_exp_div");
              var msg_id = $(elem).attr("data-msg-id");
              var time = parseDate($(elem).find(".msg_date").attr("original") ? $(elem).find(".msg_date").attr("original") : $(elem).find(".msg_date").text());
              if (!localStorage.getItem(universe + "_" + domain + "_" + msg_id) || localStorage.getItem(universe + "_" + domain + "_" + msg_id) == 0) {
                GM_xmlhttpRequest({
                  method: "POST",
                  url: 'https://logserver.' + lsDomain + '/api/exp.php?act=save',
                  data: 'v=' + version
                    + '&msg_id=' + msg_id
                    + '&player_id=' + player_id
                    + '&universe=' + universe
                    + '&domain=' + domain
                    + '&date=' + $(elem).find(".msg_date").text()
                    + '&title=' + $(elem).find(".msg_title").text()
                    + '&content=' + $(elem).find(".msg_content").text()
                    + '&sendFleet=' + (localStorage.getItem(universe + "_" + domain + "_fleet_" + time) ? localStorage.getItem(universe + "_" + domain + "_fleet_" + time)[0] : "")
                    + '&fromСore=' + (localStorage.getItem(universe + "_" + domain + "_fleet_" + time) ? localStorage.getItem(universe + "_" + domain + "_fleet_" + time)[1] : "")
                    + '&toСore=' + (localStorage.getItem(universe + "_" + domain + "_fleet_" + time) ? localStorage.getItem(universe + "_" + domain + "_fleet_" + time)[2] : "")
                    + '&id=' + localStorage.getItem('lsId'),
                  headers: {"Content-Type": "application/x-www-form-urlencoded"},
                  onload: function (response) {
                    if (response) var result = jQuery.parseJSON(response.responseText.trim());
                    if (result["err"]) {
                      $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver icon_logserver_exp_err tooltip'></span>");
                    } else {
                      if (result["result"] == "save") {
                        var icon_logserver_exp = (result["process"] == 0) ? "icon_logserver_exp_err" : "icon_logserver_exp";
                        //GM_setValue(universe + "_" + domain + "_" + msg_id, result["process"]);
                        $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver " + icon_logserver_exp + " tooltip'></span>");
                        $(elem).find(".msg_status").addClass("process" + result["process"]);
                        if (result["process"] == 0 && !localStorage.getItem(universe + "_" + domain + "_report_" + msg_id)) {
                          $(elem).find(".msg_actions").filter(":first").append(expErrList(msg_id));
                        }
                      }
                    }
                  }
                });
              } else {
                var icon_logserver_exp = (localStorage.getItem(universe + "_" + domain + "_" + msg_id) == 0) ? "icon_logserver_exp_err" : "icon_logserver_exp";
                $(elem).find(".msg_status").addClass("process" + localStorage.getItem(universe + "_" + domain + "_" + msg_id));
                $(elem).find(".msg_actions").filter(":first").append("<span class='icon_nf_logserver " + icon_logserver_exp + " tooltip'></span>");
                if (localStorage.getItem(universe + "_" + domain + "_" + msg_id) == 0 && !localStorage.getItem(universe + "_" + domain + "_report_" + msg_id))
                  $(elem).find(".msg_actions").filter(":first").append(expErrList(msg_id));
              }
            });
          } else window.clearInterval(intervalEXP);
        }, 500, this);
    }
  });

  function fStrSettings() {
    var ls_lang_selected = [], ls_server_selected = [];

    ls_lang_selected["en"] = (lsLang == "en") ? "selected" : "";
    ls_lang_selected["ru"] = (lsLang == "ru") ? "selected" : "";

    ls_server_selected["org"] = (lsDomain == "org") ? "selected" : "";
    ls_server_selected["net"] = (lsDomain == "net") ? "selected" : "";

    var ls_atack_selected_0 = (localStorage.getItem(universe + "_" + domain + "_ls_atack") == "0") ? "selected" : "";
    var ls_atack_selected_1 = (localStorage.getItem(universe + "_" + domain + "_ls_atack") == "1") ? "selected" : "";

    var ls_atack_val_selected_202 = (localStorage.getItem(universe + "_" + domain + "_ls_atack_val") == "202") ? "selected" : "";
    var ls_atack_val_selected_203 = (localStorage.getItem(universe + "_" + domain + "_ls_atack_val") == "203") ? "selected" : "";

    var ls_atack_count = (localStorage.getItem(universe + "_" + domain + "_ls_atack_count")) ? localStorage.getItem(universe + "_" + domain + "_ls_atack_count") : 0;

    var ls_exp = (localStorage.getItem(universe + "_" + domain + "_ls_exp")) ? "checked" : "";
    var ls_exp_pirates = (localStorage.getItem(universe + "_" + domain + "_ls_exp_pirates")) ? "checked" : "";
    var ls_exp_fleet = (localStorage.getItem(universe + "_" + domain + "_ls_exp_fleet")) ? "checked" : "";
    var ls_domain = (localStorage.getItem("logserverContent_" + universe + "_" + domain)) ? "checked" : "";
    var ls_spy_domain = (localStorage.getItem("logserverContentSpy_" + universe + "_" + domain)) ? "checked" : "";

    var html = "";
    html += "            <table class='lsTable' style='width: 615px;'>";
    html += "                <tr><td></td><td style='width: 120px;'></td></tr>";
    html += "                <tr><td colspan='2' style='text-align: center;'>Общие</td></tr>";
    html += "                <tr><td>" + arrLang[lsLang]["LS_lang"] + ":</td><td><select id='ls_lang' size='1' style='visibility: visible; background-color: #B3C3CB; width: 133px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 20px; line-height: 20px; padding: 2px 5px;'><option value='en' " + ls_lang_selected["en"] + ">English</option><option value='ru' " + ls_lang_selected["ru"] + ">Русский</option></select></td></tr>";
    html += "                <tr><td>" + arrLang[lsLang]["LS_server"] + ":</td><td><select id='ls_server' size='1' style='visibility: visible; background-color: #B3C3CB; width: 133px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 20px; line-height: 20px; padding: 2px 5px;'><option value='net' " + ls_server_selected["net"] + ">LogServer.Net</option><option value='org' " + ls_server_selected["org"] + ">LogServer.Org</option></select></td></tr>";
    //html += "                <tr><td colspan='2' style='text-align: center;'>Боевые</td></tr>";
    //html += "                <tr><td>Отключить привязку к вселенной:</td><td style='text-align: center;'><input id='ls_domain' type='checkbox' style='visibility: visible;' " + ls_domain + "></td></tr>";
    html += "                <tr><td colspan='2' style='text-align: center;'>Шпионские</td></tr>";
    html += "                <tr><td>Отключить привязку к вселенной:</td><td style='text-align: center;'><input id='ls_spy_domain' type='checkbox' style='visibility: visible;' " + ls_spy_domain + "></td></tr>";
    //html += "                <tr><td>&nbsp;</td><td></td></tr>";
    //html += "                <tr><td>Подставлять флот при атаке:</td><td><select id='ls_atack' size='1' style='visibility: visible; background-color: #B3C3CB; width: 133px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 20px; line-height: 20px; padding: 2px 5px;'><option value='0' " + ls_atack_selected_0 + ">Нет</option><option value='1' " + ls_atack_selected_1 + ">Да</option></select></td></tr>";
    //html += "                <tr><td>Вид транспорт:</td><td><select id='ls_atack_val' size='1' style='visibility: visible; background-color: #B3C3CB; width: 133px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 20px; line-height: 20px; padding: 2px 5px;'><option value='203' " + ls_atack_val_selected_203 + ">Бт</option><option value='202' " + ls_atack_val_selected_202 + ">Мт</option></select></td></tr>";
    //html += "                <tr><td>Количество:</td><td><input id='ls_atack_count' value='" + ls_atack_count + "' style='visibility: visible; background-color: #B3C3CB; width: 120px; border-width: 1px; border-style: solid; border-color: #668599 #668599 #D3D9DE; border-radius: 3px; box-shadow: 0px 1px 3px 0px #454F54 inset; color: #000; font-size: 12px; height: 15px; line-height: 20px; padding: 2px 5px;'></td></tr>";
    html += "                <tr><td colspan='2' style='text-align: center;'>Экспа</td></tr>";
    html += "                <tr><td>Отключить автоматическую загрузку эксп:</td><td style='text-align: center;'><input id='ls_exp' type='checkbox' style='visibility: visible;' " + ls_exp + "></td></tr>";
    html += "                <tr><td>Отключить автоматическую загрузку боев с пиратами:</td><td style='text-align: center;'><input id='ls_exp_pirates' type='checkbox' style='visibility: visible;' " + ls_exp_pirates + "></td></tr>";
    html += "                <tr><td>Отключить отслеживание флота (подсчет для черных дыр и затрат дейтерия):</td><td style='text-align: center;'><input id='ls_exp_fleet' type='checkbox' style='visibility: visible;' " + ls_exp_fleet + "></td></tr>";
    html += "                <tr><td colspan='2' style='text-align: center;'>&nbsp;</td></tr>";
    $.each(arrProcessColor, function (i, v) {
      html += "                <tr><td>" + arrProcessKey[i] + ":</td><td style='text-align: center;'><input value='" + v + "' class='lsColor' type='color' style='visibility: visible;'></td></tr>";
    });
    html += "                <tr><td>&nbsp;</td><td></td></tr>";
    html += "                <tr><td></td><td><a class='btn_blue' style='min-width: 110px;' id='ls_save_sett' href='javascript:void(0)'>" + arrLang[lsLang]["LS_save"] + "</a></td></tr>";
    html += "            </table>";

    return html;
  }

  $("#lsContent").on("click", "#ls_save_sett", function () {
    var lsColor = [];
    $.each($(".lsColor"), function (i, v) {
      lsColor[i] = $(this).val();
    });

    GM_setValue("lsColor", lsColor);
    GM_setValue("lsLang", $("#ls_lang").val());
    GM_setValue("lsDomain", $("#ls_server").val());
    GM_setValue(universe + "_" + domain + "_ls_atack", $("#ls_atack").val());
    GM_setValue(universe + "_" + domain + "_ls_atack_val", $("#ls_atack_val").val());
    GM_setValue(universe + "_" + domain + "_ls_atack_count", $("#ls_atack_count").val());
    GM_setValue(universe + "_" + domain + "_ls_exp", $("#ls_exp").prop("checked"));
    GM_setValue(universe + "_" + domain + "ls_exp_pirates", $("#ls_exp_pirates").prop("checked"));
    GM_setValue(universe + "_" + domain + "_ls_exp_fleet", $("#ls_exp_fleet").prop("checked"));
    GM_setValue("logserverContent_" + universe + "_" + domain, $("#ls_domain").prop("checked"));
    GM_setValue("logserverContentSpy_" + universe + "_" + domain, $("#ls_spy_domain").prop("checked"));
    location.reload();
  });

  function fStrDiscord() {
    var html = "";
    html += '            <iframe src="https://discordapp.com/widget?id=477591907154001920&theme=dark" width="617" height="500" allowtransparency="true" frameborder="0"></iframe>';

    return html;
  }

  function fStrShow(act, url) {
    var strShow = "";
    strShow += lsContentHeader();
    strShow += lsMenu(act);
    strShow += "<div class='tabContent'>";
    strShow += "<div class='tabs_wrap'>";
    strShow += "<div class='tab_ctn'>";
    GM_xmlhttpRequest({
      method: "GET",
      url: url + "&universe=" + universe + "&domain=" + domain + "&player_id=" + player_id + "&" + act + "_" + universe + "_" + domain + "=" + localStorage.getItem(act + "_" + universe + "_" + domain),
      headers: {"Content-Type": "application/json"},
      onload: function (response) {
        if (response) {
          var varResult = jQuery.parseJSON(response.responseText.trim());
          if (varResult["err"] == "api_not_found")
            GM_setValue('lsId', false);
          else
            var varShow = varResult["logs"];
        }
        if (act == "logserverContent") {
          strShow += "    <div class='content'>";
          strShow += "            <table class='lsTable'>";
          if (varResult["result"]) {
            strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
            strShow += "                <thead>";
            strShow += "                    <tr height='28'>";
            strShow += "                        <th align='center' width='60'>" + arrLang[lsLang]["lang_table_date"] + "</th>";
            strShow += "                        <th align='center' width='100%'>" + arrLang[lsLang]["lang_table_title"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_losses"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_uni"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_lang"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_public"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_del"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_edit"] + "</th>";
            strShow += "                    </tr>";
            strShow += "                </thead>";
            for (var i = 0; i < varShow.length; i++) {
              strShow += "                <tr>";
              strShow += "                    <td align='center' class='date'>" + varShow[i]['date'] + "</td>";
              strShow += "                    <td align='left'><a href='" + strLogServerURL + "?id=" + varShow[i]['id'] + "' target='_blank'>" + varShow[i]['title'] + "</a></td>";
              strShow += "                    <td align='center'>" + varShow[i]['losses'] + "</td>";
              strShow += "                    <td align='center'>" + varShow[i]['uni'] + "</td>";
              strShow += "                    <td align='center'>" + varShow[i]['domain'] + "</td>";
              strShow += "                    <td align='center'><img class='pub' logid='" + varShow[i]['id'] + "' public = '" + varShow[i]['public'] + "' style='cursor:pointer' src='https://logserver.net/index_files/abox/icon_pub_" + varShow[i]['public'] + ".png' width='16' border='0'></td>";
              strShow += "                    <td align='center'><span class='del icon_nf icon_refuse js_actionKill tooltip js_hideTipOnMobile' logid='" + varShow[i]['id'] + "'></span></td>";
              strShow += "                    <td align='center'><a href='" + strLogServerURL + "?show=edit&log_id=" + varShow[i]['base64'] + "' target='_blank'><span class='icon_nf icon_copy_paste js_actionKill tooltip js_hideTipOnMobile'></span></a></td>";
              strShow += "                </tr>";
            }
            strShow += "                <tr><td align='center' colspan='11'>&nbsp;</td></tr>";
            strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
          } else {
            strShow += "                <tr><td align='center' colspan='11'>Logs not found.</td></tr>";
          }
          strShow += "            </table><br><br>";
          strShow += "        </div>";
        }
        if (act == "logserverContentSpy") {
          strShow += "    <div class='content'>";
          strShow += "            <table class='lsTable'>";
          if (varResult["result"]) {
            strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
            strShow += "                <thead>";
            strShow += "                    <tr height='28'>";
            strShow += "                        <th align='center' width='20'>A</th>";
            strShow += "                        <th align='center' width='60'>" + arrLang[lsLang]["lang_table_date"] + "</th>";
            strShow += "                        <th align='center' width='60'>" + arrLang[lsLang]["lang_table_moon"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_core"] + "</th>";
            strShow += "                        <th align='center' width='100%'>" + arrLang[lsLang]["lang_table_name"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_player"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_uni"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_resurs"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_fleet"] + "</th>";
            strShow += "                        <th align='center' width='0'>" + arrLang[lsLang]["lang_table_actions"] + "</th>";
            strShow += "                    </tr>";
            strShow += "                </thead>";
            for (var i = 0; i < varShow.length; i++) {
              if (varShow[i]['type'] == 3) var picMoon = "<figure class='planetIcon moon tooltip js_hideTipOnMobile'></figure>";
              else var picMoon = "";
              strShow += "                <tr>";
              strShow += "                    <td align='center'>" + varShow[i]['active'] + "</td>";
              strShow += "                    <td align='center' class='date'>" + varShow[i]['date'] + "</td>";
              strShow += "                    <td align='center'>" + picMoon + "</td>";
              strShow += "                    <td align='center'><a href='index.php?page=ingame&component=galaxy&galaxy=" + varShow[i]['g'] + "&system=" + varShow[i]['s'] + "&position=" + varShow[i]['p'] + "'>" + varShow[i]['g'] + ":" + varShow[i]['s'] + ":" + varShow[i]['p'] + "</a></td>";
              strShow += "                    <td align='left'><a href='" + strLogServerURL + "?id=" + varShow[i]['id'] + "' target='_blank'>" + varShow[i]['title'] + "</a></td>";
              strShow += "                    <td align='center'>" + varShow[i]['player'] + "</td>";
              strShow += "                    <td align='center'>" + varShow[i]['uni'] + "." + varShow[i]['domain'] + "</td>";
              strShow += "                    <td align='center'>" + varShow[i]['loot'] + "</td>";
              strShow += "                    <td align='center'>" + varShow[i]['fleet'] + "</td>";
              strShow += "                    <td align='center'>";
              strShow += "                        <div style='display:inline-block; width: 110px;'>";
              strShow += "                            <span class='icon_nf icon_trashsim tooltip js_hideTipOnMobile tpd-hideOnClickOutside' title=''></span>";
              strShow += "                            <span class='del icon_nf icon_refuse  js_actionKill tooltip js_hideTipOnMobile' logid='" + varShow[i]['id'] + "'></span>";
              strShow += "                            <a href='#' onclick='sendShipsWithPopup(6," + varShow[i]['g'] + "," + varShow[i]['s'] + "," + varShow[i]['p'] + "," + varShow[i]['type'] + ",0); return false;' class='icon_nf_link_logserver fleft'><span class='icon_nf icon_espionage tooltip js_hideTipOnMobile' title=''></a>";
              var ls_atack = (localStorage.getItem(universe + "_" + domain + "_ls_atack") == 1) ? "&am" + localStorage.getItem(universe + "_" + domain + "_ls_atack_val") + "=" + localStorage.getItem(universe + "_" + domain + "_ls_atack_count") : "";
              strShow += "                            <a href='index.php?page=ingame&component=fleetdispatch&galaxy=" + varShow[i]['g'] + "&system=" + varShow[i]['s'] + "&position=" + varShow[i]['p'] + "&type=" + varShow[i]['type'] + "&mission=1" + ls_atack + "' class='icon_nf_link_logserver fleft'><span class='icon_nf icon_attack tooltip js_hideTipOnMobile " + varShow[i]['g'] + "" + varShow[i]['s'] + "" + varShow[i]['p'] + "" + varShow[i]['type'] + "' title=''></a>";
              strShow += "                        </div>";
              strShow += "                    </td>";
              strShow += "                </tr>";
            }
            strShow += "                <tr><td align='center' colspan='11'>&nbsp;</td></tr>";
            strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
          } else {
            strShow += "                <tr><td align='center' colspan='11'>Logs not found.</td></tr>";
          }
          strShow += "            </table><br><br>";
          strShow += "        </div>";
        }
        if (act == "logserverContentAll") {
          strShow += "    <div class='content'>";
          strShow += "            В разработке.";
          strShow += "        </div>";
        }
        if (act == "logserverContentSpyAll") {
          strShow += "    <div class='content'>";
          strShow += "            В разработке.";
          strShow += "        </div>";
        }

        if (act == "logserverContentExp") {
          var varProcess = varResult["process"];
          var varProcessDay = varResult["process_day"];
          var varProcessWeek = varResult["process_week"];
          var arrProfit = varResult["arrprofit"];
          var arrFleet = jQuery.parseJSON(varResult["fleet"]);

          strShow += "    <div class='content'>";
          if (varResult["result"]) {
            strShow += "    <table class='lsTable' style='width: 615px;'>";
            strShow += "        <tr><td style='vertical-align: top;'>";
            strShow += "            <table class='lsTable' style='width: 297px;'>";
            strShow += "                <thead>";
            strShow += "                    <tr height='28'>";
            strShow += "                        <th align='center'>Событие</th>";
            strShow += "                        <th align='center' width='50px'>День</th>";
            strShow += "                        <th align='center' width='50px'>Неделя</th>";
            strShow += "                        <th align='center' width='50px'>Всего</th>";
            strShow += "                    </tr>";
            strShow += "                </thead>";
            var imgArrProcessKey = [];
            var imgArrProcessColor = [];
            var imgArrProcessCount = [];
            var y = 0;
            var varProcessDayAll = 0;
            var varProcessWeekAll = 0;
            var varProcessAll = 0;
            for (var i = 0; i < arrProcessKey.length - 1; i++) {
              if (varProcess[i]) {

                if (varProcessDay)
                  varProcessDayAll += (varProcessDay[i] !== undefined) ? varProcessDay[i] : 0;
                if (varProcessWeek)
                  varProcessWeekAll += (varProcessWeek[i] !== undefined) ? varProcessWeek[i] : 0;

                varProcessAll += varProcess[i];

                imgArrProcessKey.push(arrProcessKey[Object.keys(varProcess)[y]]);
                imgArrProcessColor.push(arrProcessColor[i]);
                imgArrProcessCount.push(varProcess[i]);
                strShow += "                <tr class='process" + Object.keys(varProcess)[y] + "' style='color: #fff;'>";
                strShow += "                    <td align='left'>" + arrProcessKey[Object.keys(varProcess)[y]] + "</td>";
                strShow += "                    <td align='center'>" + (varProcessDay ? ((varProcessDay[i]) ? varProcessDay[i] : 0) : 0) + "</td>";
                strShow += "                    <td align='center'>" + (varProcessWeek ? ((varProcessWeek[i]) ? varProcessWeek[i] : 0) : 0) + "</td>";
                strShow += "                    <td align='center'>" + ((varProcess[i]) ? varProcess[i] : 0) + "</td>";
                strShow += "                </tr>";
                y++;
              }
            }
            strShow += "                <tr><td colspan='4'>&nbsp;</td></tr>";

            strShow += "                <tr>";
            strShow += "                    <td align='left'>" + arrLang[lsLang]["all"] + "</td>";
            strShow += "                    <td align='center'>" + varProcessDayAll + "</td>";
            strShow += "                    <td align='center'>" + varProcessWeekAll + "</td>";
            strShow += "                    <td align='center'>" + varProcessAll + "</td>";
            strShow += "                </tr>";

            strShow += "                <tr><td colspan='4'>&nbsp;</td></tr>";

            strShow += "                <tr>";
            strShow += "                    <td align='left'>Прибыль</td>";
            strShow += "                    <td align='center' colspan='3'>" + varResult["profit"] + "</td>";
            strShow += "                </tr>";
            strShow += "                <tr>";
            strShow += "                    <td align='left'>Потери</td>";
            strShow += "                    <td align='center' colspan='3'>" + varResult["losses"] + "</td>";
            strShow += "                </tr>";
            strShow += "                <tr>";
            strShow += "                    <td align='left'>Поле обломков</td>";
            strShow += "                    <td align='center' colspan='3'>" + varResult["derbis"] + "</td>";
            strShow += "                </tr>";
            strShow += "                <tr>";
            strShow += "                    <td align='left'>Тёмная Материя</td>";
            strShow += "                    <td align='center' colspan='3'>" + numberPlugin(varResult["dm"], true) + "</td>";
            strShow += "                </tr>";
            strShow += "            </table>";
            strShow += "            </td>";

            strShow += "            <td>";
            strShow += "            <table class='lsTable' style='width: 300px; vertical-align: top;'>";
            strShow += "                <tr>";
            strShow += "                    <td><iframe src='https://logserver.net/chart/?p=" + imgArrProcessKey.join(",") + "&c=" + imgArrProcessColor.join(",") + "&d=" + imgArrProcessCount.join(",") + "' width='300px' height='300px' scrolling='no'></iframe></td>";
            strShow += "                </tr>";
            strShow += "            </table>";
            strShow += "        </td></tr>";
            strShow += "    </table><br>";

            strShow += "<div class='showTable' show='#tableStat' style='width: 615px; height: 28px; background-image: url(//gf3.geo.gfsrv.net/cdne1/d03835718066a5a592a6426736e019.png); color: #848484; text-align: center; cursor:pointer;'><div style='position:relative; top: 6px'>Найдены ресурсы</div></div>";
            strShow += tableStat(arrProfit);

            strShow += "<div class='showTable' show='#tableFleet' style='width: 615px; height: 28px; background-image: url(//gf3.geo.gfsrv.net/cdne1/d03835718066a5a592a6426736e019.png); color: #848484; text-align: center; cursor:pointer;'><div style='position:relative; top: 6px'>Найден флот</div></div>";
            strShow += tableFleet(arrFleet);

            strShow += "            <table class='lsTable' style='width: 615px;'>";
            strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
            strShow += "                <thead>";
            strShow += "                    <tr height='28'>";
            strShow += "                        <th align='center'>" + arrLang[lsLang]["lang_table_date"] + "</th>";
            strShow += "                        <th align='center'>" + arrLang[lsLang]["lang_table_core"] + "</th>";
            strShow += "                        <th align='center'>Металл</th>";
            strShow += "                        <th align='center'>Кристалл</th>";
            strShow += "                        <th align='center'>Дейтерий</th>";
            strShow += "                        <th align='center'>Прибыль</th>";
            strShow += "                        <th align='center'>Флот</th>";
            strShow += "                        <th align='center'>Событие</th>";
            strShow += "                    </tr>";
            strShow += "                </thead>";
            for (var i = 0; i < varShow.length; i++) {
              var profit = (varShow[i]['dm'] > 0) ? numberPlugin(varShow[i]['dm'], true) + "ТМ" : varShow[i]['profit'];
              var fleet = (varShow[i]['fleet']) ? parseFleet(jQuery.parseJSON(varShow[i]['fleet'])) : "";
              strShow += "                <tr>";
              strShow += "                    <td align='center' class='date'>" + varShow[i]['date'] + "</td>";
              strShow += "                    <td align='center'><a href='index.php?page=ingame&component=galaxy&galaxy=" + varShow[i]['g'] + "&system=" + varShow[i]['s'] + "&position=" + varShow[i]['p'] + "'>" + varShow[i]['g'] + ":" + varShow[i]['s'] + ":" + varShow[i]['p'] + "</a></td>";
              strShow += "                    <td align='center'>" + varShow[i]['metal'] + "</td>";
              strShow += "                    <td align='center'>" + varShow[i]['crystal'] + "</td>";
              strShow += "                    <td align='center'>" + varShow[i]['deuterium'] + "</td>";
              strShow += "                    <td align='center'>" + profit + "</td>";
              strShow += "                    <td align='center'>" + fleet + "</td>";
              strShow += "                    <td align='center'>" + arrProcessKey[varShow[i]['process']] + "</td>";
              strShow += "                </tr>";
            }
            strShow += "                <tr><td align='center' colspan='11'>&nbsp;</td></tr>";
            strShow += "                <tr><td align='center' colspan='11'>|<span class='firstpage' style='cursor:pointer'><<</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='backpage' style='cursor:pointer'><</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + varResult["page"] + "/" + varResult["pages"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='nextpage' style='cursor:pointer'>></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='lastpage' style='cursor:pointer'>>></span>|</td></tr>";
            strShow += "            </table><br><br>";

          } else {
            strShow += "            <table class='lsTable' style='width: 615px;'>";
            strShow += "                <tr><td align='center' colspan='11'>Logs not found.</td></tr>";
            strShow += "            </table><br>";
          }
          strShow += "        </div>";
        }

        $("#lsContent").html(strShow);

        $(".firstpage").click((function () {
          fStrShow(act, 'https://logserver.' + lsDomain + '/api/api.php?act=' + act + '&v=' + version + '&n=1&id=' + localStorage.getItem('lsId'));
        }));
        $(".lastpage").click((function () {
          fStrShow(act, 'https://logserver.' + lsDomain + '/api/api.php?act=' + act + '&v=' + version + '&n=' + varResult["pages"] + '&id=' + localStorage.getItem('lsId'));
        }));
        $(".backpage").click((function () {
          if (1 < varResult["page"] && varResult["pages"] >= varResult["page"])
            fStrShow(act, 'https://logserver.' + lsDomain + '/api/api.php?act=' + act + '&v=' + version + '&n=' + (parseInt(varResult["page"]) - 1) + '&id=' + localStorage.getItem('lsId'));
        }));
        $(".nextpage").click((function () {
          if (varResult["pages"] > varResult["page"])
            fStrShow(act, 'https://logserver.' + lsDomain + '/api/api.php?act=' + act + '&v=' + version + '&n=' + (parseInt(varResult["page"]) + 1) + '&id=' + localStorage.getItem('lsId'));
        }));
        $(".pub").click((function () {
          var vthis = $(this);
          var logid = $(this).attr("logid");
          var public = $(this).attr("public");
          GM_xmlhttpRequest({
            method: "GET",
            url: 'https://logserver.' + lsDomain + '/api/api.php?act=' + act + '&get=pub&v=' + version + '&logid=' + logid + '&public=' + public + '&id=' + localStorage.getItem('lsId'),
            headers: {"Content-Type": "application/json"},
            onload: function (response) {
              result = response.responseText.trim();
              if (result) {
                vthis.attr("src", "https://logserver.net/index_files/abox/icon_pub_" + result + ".png");
                vthis.attr("public", result);
              }
            }
          });
        }));
        $(".del").click((function () {
          var vthis = $(this);
          var logid = $(this).attr("logid");
          if (confirm("Delete?")) {
            GM_xmlhttpRequest({
              method: "GET",
              url: 'https://logserver.' + lsDomain + '/api/api.php?act=' + act + '&get=del&v=' + version + '&logid=' + logid + '&id=' + localStorage.getItem('lsId'),
              headers: {"Content-Type": "application/json"},
              onload: function (response) {
                var result = response.responseText.trim();
                if (result) {
                  vthis.attr("class", "");
                }
              }
            });
          }
        }));
      }
    });
  }

  function lsContentHeader() {
    var html = "";
    html += "<div id='lsHeader'>";
    html += "   <div id='lsTitle'>" + arrLang[lsLang]["LogServer_plugin"] + " v." + version;
    if (localStorage.getItem('lsId')) html += "<span class='lsLogout'>[" + arrLang[lsLang]["LS_logout"] + "]</span>";
    html += "   </div>";
    html += "   <div id='lsMenu'></div>";
    html += "</div>";
    return html;
  }

  function lsMenu(act) {
    var html = "";
    html += "<ul class='tabs_btn ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'>";
    html += strBtn("tabs-logserver-bat", arrLang[lsLang]["my_battles"], "logserverContent", (act == "logserverContent") ? 1 : 0);
    html += strBtn("tabs-logserver-spy", arrLang[lsLang]["spy_report"], "logserverContentSpy", (act == "logserverContentSpy") ? 1 : 0);
    //html +=      strBtn ("tabs-logserver-all-bat", arrLang[lsLang]["alliance_battles"], "logserverContentAll", (act=="logserverContentAll") ? 1 : 0);
    //html +=      strBtn ("tabs-logserver-all-spy", arrLang[lsLang]["alliance_spy"], "logserverContentSpyAll", (act=="logserverContentSpyAll") ? 1 : 0);
    html += strBtn("tabs-logserver-exp", arrLang[lsLang]["menu_exp"], "logserverContentExp", (act == "logserverContentExp") ? 1 : 0);
    html += strBtn("tabs-logserver-discord", arrLang[lsLang]["discord"], "logserverDiscord", (act == "logserverDiscord") ? 1 : 0);
    html += strBtn("tabs-logserver-options", arrLang[lsLang]["LS_sett"], "logserverOptions", (act == "logserverOptions") ? 1 : 0);
    html += "</ul>";
    return html;
  }

  $("#lsContent").on("click", ".lsLogout", function () {
    GM_setValue('lsId', 0);
    $(".lsButt").click();
  });

  function fStrLogin() {
    var strLogin = "";

    strLogin += "    <div class='lsLoginTable'>";
    strLogin += "       <form action='login.php'>";
    strLogin += "       <center><table>";
    strLogin += "           <tr><td style='width: 120px;'></td><td style='width: 120px;'></td><td style='width: 120px;'></tr>";
    strLogin += "           <tr class='ls_form'><td style='text-align: left;'>" + arrLang[lsLang]["LS_login"] + ":</td><td><input id='ls_l' name='login' tabindex='1' type='text' style='position: inherit; text-align: center; width: 120px; height: 15px;'></td><td style='text-align: right;'><a href='" + strLogServerURL + "?show=registration' target='_blank'>" + arrLang[lsLang]["LS_reg"] + "</a></td></tr>";
    strLogin += "           <tr class='ls_form'><td style='text-align: left;'>" + arrLang[lsLang]["LS_pass"] + ":</td><td><input id='ls_p' name='password' tabindex='2' type='password' style='position: inherit; text-align: center; width: 120px; height: 15px;'></td><td style='text-align: right;'><a href='" + strLogServerURL + "?show=lostpw' target='_blank'>" + arrLang[lsLang]["LS_f_p"] + "</a></td></tr>";
    strLogin += "           <tr class='ls_form'><td>&nbsp;</td><td></td><td></td></tr>";
    strLogin += "           <tr class='ls_form'><td></td><td><input type='submit' class='btn_blue' tabindex='3' style='width: 130px;' id='lsLogin' value='" + arrLang[lsLang]["LS_login"] + "'></td><td></td></tr>";
    strLogin += "           <tr class='ls_imgLoad' style='display:none' height='30'><th colspan='3'><img src='https://logserver.net/index_files/ajax-loader.gif'></th></tr>";
    strLogin += "           <tr class='ls_form'><td>&nbsp;</td><td></td><td></td></tr>";
    strLogin += "           <tr class='ls_form lsErrForm' style='display: none'><th colspan='3' class='lsErr'></th></tr>";
    strLogin += "       </table></center>";
    strLogin += "       </form>";
    strLogin += "       </div>";

    return strLogin;
  }

  function lsLoginErr(err) {
    $(".ls_imgLoad").hide();
    $(".ls_form").show();
    $(".lsErrForm").show();
    $(".lsErr").html(err);
  }

  $("#lsContent").on("click", ".showTable", function () {
    ($($(this).attr("show")).is(":visible") == true) ? $($(this).attr("show")).hide() : $($(this).attr("show")).show();
  });

  $("#lsContent").on("click", "#lsLogin", function () {
    event.preventDefault();
    $(".ls_form").hide();
    $(".ls_imgLoad").show();

    if (!$("#ls_l").val()) lsLoginErr(arrLang[lsLang]["LS_not_l"])
    else if (!$("#ls_p").val()) lsLoginErr(arrLang[lsLang]["LS_not_p"]);
    else {
      GM_xmlhttpRequest({
        method: "GET",
        url: 'https://logserver.' + lsDomain + '/api/api.php?act=login&v=' + version + '&l=' + $("#ls_l").val() + '&p=' + $("#ls_p").val(),
        headers: {"Content-Type": "application/json"},
        onload: function (response) {
          if (response) var varResult = jQuery.parseJSON(response.responseText.trim());
          if (varResult) {
            if (varResult.err == '0') lsLoginErr(arrLang[lsLang]["LS_wl_ow_p"]);
            else if (varResult.err == '-1') lsLoginErr(arrLang[lsLang]["LS_not_l"]);
            else if (varResult.err == '-2') lsLoginErr(arrLang[lsLang]["LS_not_p"]);
            else if (varResult.err == '-999') lsLoginErr('Script version is outdated! Update: <a href="https://logserver.net/plugin/_logserver_gms_combatreport.user.js" target="_blank">https://logserver.net/plugin/_logserver_gms_combatreport.user.js</a>.');
            else {
              GM_setValue('lsId', varResult.id);
              fStrShow('logserverContent', 'https://logserver.' + lsDomain + '/api/api.php?act=logserverContent&v=' + version + '&id=' + localStorage.getItem('lsId'));
            }
          } else lsLoginErr('Сервер не доступен.<br />Повторите попытку позже.');
        }
      });
    }
  });

  function strBtn(id, name, get, act) {
    active = (act) ? "ui-tabs-active" : "";
    var strBtn = "";
    strBtn += "<li id='" + id + "' class='lsButt' get='" + get + "' lsVis='" + $gameContent.attr("id") + "'>";
    strBtn += "   <a href='javascript:void(0)' class='tabs_btn_logserver tb-" + id + " ui-tabs-anchor " + active + "'>";
    strBtn += "      <span class='new_msg_count' style='display: none;'>0</span> <img src='https://gf2.geo.gfsrv.net/cdndf/3e567d6f16d040326c7a0ea29a4f41.gif' width='54' height='54'> ";
    strBtn += "      <div class='marker'></div>";
    strBtn += "      <span class='icon_caption'>" + name + "</span> ";
    strBtn += "   </a>";
    strBtn += "</li>";
    return strBtn;
  }

  if (document.location.href.indexOf("&logserver") > 1) {
    alert("LogServer.net GM script\nversion: " + version);
  }

  if (!localStorage.getItem(universe + "_" + domain + "_ls_exp_fleet")) {
    if (document.location.href.indexOf("component=fleetdispatch") > 1 || document.location.href.indexOf("component=movement") > 1) {
      $.ajax({
        url: '/game/index.php?page=componentOnly&component=eventList&ajax=1',
        success: function (data) {
          $(data).find(".eventFleet").each(function (i, elem) {
            if ($(elem).attr("data-return-flight") == "false" && $(elem).attr("data-mission-type") == "15") {
              var time = $(elem).attr("data-arrival-time");
              if (!localStorage.getItem(universe + "_" + domain + "_fleet_" + time)) {
                var fleet = $($(elem).find(".icon_movement").find("span").attr("title")).text().replace(/\r?\n/g, "").replace(/\s+/g, " ").trim();
                var fromСore = $(elem).find(".coordsOrigin").text().replace(/\r?\n/g, "").replace(/\s+/g, " ").replace(/\[/g, " ").replace(/\]/g, " ").trim();
                var toСore = $(elem).find(".destCoords").text().replace(/\r?\n/g, "").replace(/\s+/g, " ").replace(/\[/g, " ").replace(/\]/g, " ").trim();

                GM_setValue(universe + "_" + domain + "_fleet_" + time, [fleet, fromСore, toСore]);
              }
            }
          });
        }
      });
    }
  }

  function getCoreAtack() {
    $.ajax({
      url: '/game/index.php?page=eventList&ajax=1',
      success: function (data) {
        $(data).find(".eventFleet").each(function (i, elem) {
          if ($(elem).attr("data-return-flight") == "false") {
            if ($(elem).attr("data-mission-type") == "1") {
              if ($(elem).find(".destFleet").find(".planetIcon.planet").length) var planetIcon = 1;
              if ($(elem).find(".destFleet").find(".planetIcon.moon").length) var planetIcon = 3;
              var core = $(elem).find(".destCoords").text().replace(/[^-0-9]/gim, '');
              $("." + core + "" + planetIcon).html("<img src='/cdn/img/layout/fleet_12x12_hostile.gif' class='fright' width='12' height='12' alt='Флот атакует!''>")
            }
          }
        });
      }
    });
  }

  function tableStat(arrProfit) {
    var strShow = "";
    strShow += "            <table id='tableStat' class='lsTable' style='width: 615px; display: none;'>";
    strShow += "                <tr>";
    strShow += "                    <td></td>";
    strShow += "                    <td></td>";
    strShow += "                    <td style='text-align:center'>ТМ</td>";
    strShow += "                    <td style='text-align:center'>Металл</td>";
    strShow += "                    <td style='text-align:center'>Кристалл</td>";
    strShow += "                    <td style='text-align:center'>Дейтерий</td>";
    strShow += "                    <td style='text-align:center'>Всего</td>";
    strShow += "                </tr>";

    $.each(arrProfit, function (index, value) {
      var r = 0
      $.each(value, function (i, v) {
        (r == 0) ? "<td rowspan='3'>" + index + "</td>" : "";
        strShow += "                <tr>";
        strShow += (r == 0) ? "<td rowspan='3' style='text-align:center'>" + arrLang[lsLang][index] + "</td>" : "";
        strShow += "                    <td>" + arrLang[lsLang][i] + "</td>";
        strShow += "                    <td style='text-align:center'>" + numberPlugin((v["dm"]) ? v["dm"] : 0, true) + "</td>";
        strShow += "                    <td style='text-align:center'>" + numberPlugin(v["metal"]) + "</td>";
        strShow += "                    <td style='text-align:center'>" + numberPlugin(v["crystal"]) + "</td>";
        strShow += "                    <td style='text-align:center'>" + numberPlugin(v["deuterium"]) + "</td>";
        strShow += "                    <td style='text-align:center'>" + numberPlugin(v["metal"] + v["crystal"] + v["deuterium"]) + "</td>";
        strShow += "                </tr>";
        r++;
      });
    });

    strShow += "            </table><br>";

    return strShow;
  }

  function tableFleet(arrFleet) {
    var dgNameFleet = [];
    var dgValFleet = [];
    var strShow = "";
    strShow += "    <table id='tableFleet' class='lsTable' style='width: 615px; display: none;'>";
    strShow += "        <tr>";
    strShow += "            <td style='vertical-align: top;'>";
    strShow += "                <table class='lsTable' style='width: 297px;'>";
    $.each(arrFleet, function (index, value) {
      if (value > 0) {
        dgNameFleet.push(arrNameFleet[index]);
        dgValFleet.push(value);
        strShow += "                <tr>";
        strShow += "                    <td>" + arrNameFleet[index] + "</td>";
        strShow += "                    <td style='text-align: center;'>" + numberPlugin(value, true) + "</td>";
        strShow += "                </tr>";
      }
    });

    strShow += "                </table>";
    strShow += "            </td>";

    strShow += "            <td>";
    strShow += "                <table class='lsTable' style='width: 300px;'>";
    strShow += "                    <tr>";
    strShow += "                        <td><iframe src='https://logserver.net/chart/?p=" + dgNameFleet.join(",") + "&d=" + dgValFleet.join(",") + "' width='300px' height='300px' scrolling='no'></iframe></td>";
    strShow += "                    </tr>";
    strShow += "                </table>";
    strShow += "            </td>";
    strShow += "        </tr>";

    strShow += "    </table><br>";

    return strShow;
  }

  function parseFleet(arr) {
    var result = "";
    var arrFleet = [];
    arrFleet[204] = "ли";
    arrFleet[205] = "ти";
    arrFleet[206] = "крыс";
    arrFleet[207] = "линк";
    arrFleet[215] = "линеек";
    arrFleet[211] = "бомб";
    arrFleet[213] = "унич";
    arrFleet[214] = "зс";
    arrFleet[218] = "жнец";
    arrFleet[219] = "перв";
    arrFleet[202] = "мт";
    arrFleet[203] = "бт";
    arrFleet[208] = "колон";
    arrFleet[209] = "раб";
    arrFleet[210] = "шз";
    arrFleet[212] = "сс";
    arrFleet[217] = "гус";
    arrFleet[216] = "тор";

    $.each(arr, function (index, value) {
      result += value + " " + arrFleet[index] + '<br>';
    });

    return result;
  }

  function expErrList(msg_id) {
    var html = "";
    html += "<span>";
    html += "<select class='expErrList' data-msg-id='" + msg_id + "' size='1' style='visibility: visible; height: 26px; position: relative; top: -9px; left: 8px;'>";
    $.each(arrProcessKey, function (index, value) {
      if (index != 21)
        html += "<option value='" + index + "'>" + value + "</option>";
    });
    html += "</select>";
    html += "</span>";

    return html;
  }

  $(".content").on("change", ".expErrList", function () {
    var $select = $(this);
    if (confirm("Send report?")) {
      $select.css("display", "none");
      GM_xmlhttpRequest({
        method: "POST",
        url: 'https://logserver.' + lsDomain + '/api/exp.php?act=report',
        data: 'v=' + version
          + '&msg_id=' + $(this).attr("data-msg-id")
          + '&player_id=' + player_id
          + '&universe=' + universe
          + '&domain=' + domain
          + '&report=' + $(this).find("option:selected").val()
          + '&id=' + localStorage.getItem('lsId'),
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        onload: function (response) {
          if (response) {
            var result = jQuery.parseJSON(response.responseText.trim());
            (result["result"] == "save") ? GM_setValue(universe + "_" + domain + "_report_" + $select.attr("data-msg-id"), true) : $select.css("display", "");
          }
        }
      });
    }
  });

  function numberPlugin(intNumber, s) {
    var strValue;
    var strClass;
    var strMin = "";

    if (intNumber < 0) {
      intNumber = intNumber * -1;
      strMin = "-";
    }

    if (s) return '<font class="abox_text">' + strMin + intNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '</font>';

    if (intNumber < 1000) {
      strValue = intNumber;
      strClass = 'abox_text';
    } else if (intNumber < 1000000) {
      strValue = (Math.round(intNumber / 1000, 1)) + "K";
      strClass = 'abox_text_yellow';
    } else if (intNumber < 1000000000) {
      strValue = (Math.round(intNumber / 1000000, 1)) + "Mn";
      strClass = 'abox_text_green';
    } else if (intNumber < 1000000000000) {
      strValue = (Math.round(intNumber / 1000000000, 1)) + "Bn";
      strClass = 'abox_text_red';
    } else
      strClass = 'abox_text_red';

    return '<font class="' + strClass + '">' + strMin + strValue + '</font>';
  }

  function parseDate(s) {
    if (!s) return false;
    var p = s.split(' ');
    var d = p[0].split('.');
    var f = p[1].split(':');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    var date = new Date(parseInt(d[2]), parseInt(d[1]) - 1, parseInt(d[0]), parseInt(f[0]), parseInt(f[1]), parseInt(f[2])).getTime() / 1000 - 1;

    if (domain == "pl" || domain == "es")
      date = date - 2400;
    if (domain == "ru")
      date = date - 7200;

    return date;
  }

  function getUrlVars(r) {
    if (!r) return !1;
    for (var t, e = [], i = r.slice(r.indexOf("?") + 1).split("&"), n = 0; n < i.length; n++) e[(t = i[n].split("="))[0]] = t[1];
    return e
  }
}
