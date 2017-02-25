'use strict';

function main_function(data) {

    const dt = data.target;

    if (dt.className == '_8gpiy _r43r5') {
        let photo_url = dt.src.replace(/\b\/s([0-9]{3})x([0-9]{3})\b/, '');//remove size tags
        popup(photo_url);//this part that determinate photo size
    }

    if (dt.id == 'PPVFI_close' || dt.id == 'PPVFI_black_layer') {
        close_popup();
    }

    if(dt.id == 'PPVFI_photo'){
        if(dt.className != 'zoom') {
            document.getElementById('PPVFI_photo').className = 'zoom';
        }else {
            document.getElementById('PPVFI_photo').className = '';
        }
    }

    if (dt.id == 'PPVFI_link') {
        open_share_popup();
    }

    if (dt.id == 'PPVFI_button' || dt.id == 'PPVFI_share') {
        close_share_popup();
    }

}

function close_popup_esc(key) {
    if (key.keyCode == 27) {
        if (document.getElementById('PPVFI') != null) {
            close_popup();
        }
        if (document.getElementById('PPVFI_share') != null) {
            close_share_popup();
        }
    }
}

function close_popup() {
    let child = document.getElementById('PPVFI');
    document.getElementById('PPVFI_black_layer').style.opacity = '0';
    setTimeout(function () {
        child.parentNode.removeChild(child);
    }, 300);
}

function popup(url) {
    let msg_photo_link_tip = chrome.i18n.getMessage('photo_link_tip');
    let msg_photo_link = chrome.i18n.getMessage('photo_link');
    let  msg_close_tip = chrome.i18n.getMessage('close_popup_tip');
    let PPVFI_div = document.createElement('div');

    PPVFI_div.id = 'PPVFI';
    document.body.appendChild(PPVFI_div);
    document.getElementById('PPVFI').innerHTML = `<div id='PPVFI_black_layer'>
        <img id='PPVFI_photo' src='${url}'/> 
        <div id='PPVFI_close' class='_3eajp' title='${msg_close_tip}'></div>
        <div id='PPVFI_panel'>
        <a class="PPVFI_button_panel" id='PPVFI_link' title='${msg_photo_link_tip}'>${msg_photo_link}</a>
        </div>
        </div>`;
}


function open_share_popup() {
    let msg_share_title = chrome.i18n.getMessage('share_popup_title');
    let msg_close_share_popup = chrome.i18n.getMessage('close_share_popup');
    let img_url_share = document.getElementById('PPVFI_photo').src;
    const PPVFI_share_div = document.createElement('div');

    PPVFI_share_div.id = 'PPVFI_share';
    document.body.appendChild(PPVFI_share_div);
    document.getElementById('PPVFI_share').innerHTML = `<div id='PPVFI_share_box'>
        <div class='PPVFI_head'> ${msg_share_title} </div>
        <input id='PPVFI_url' type='text' value='${img_url_share}'> 
        <div class='PPVFI_footer'>
        <button class='_ah57t _84y62 _i46jh _rmr7s' id='PPVFI_button'>${msg_close_share_popup}</button>
        </div>
        </div>`;

    setTimeout(function () {
        document.getElementById('PPVFI_share').style.opacity = 1;
        document.getElementById('PPVFI_share_box').style.top = '50px';
    }, 300);
    document.getElementById('PPVFI_url').select();

}

function close_share_popup() {

    const child2 = document.getElementById('PPVFI_share');

    document.getElementById('PPVFI_share').style.opacity = '0';
    setTimeout(function () {
        child2.parentNode.removeChild(child2);
    }, 200);

}

document.addEventListener('click', main_function, false);
document.addEventListener('keyup', close_popup_esc, false);