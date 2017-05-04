var size = 30;
var yoko = 18;
var tate = 39;

/*
alert($('.line').eq(0).text());
alert($('.line').eq(1).text());
alert($('.line').eq(2).text());
*/

/* mousemoveイベント */
$('#greenscreen').on('mousemove',getClinetPoint);


/* keydownイベント処理 */
$('#hiddenarea').focus();
$('#hiddenarea').on('keydown',keyevent);


function getClinetPoint(event){
  // マウス位置を取得する
  var mouseX = event.clientX ;  // X座
  var mouseY = event.clientY ;  // Y座標 
  $('#x-point').val(mouseX); 
  $('#y-point').val(mouseY); 

};

/* キーイベント処理 */
function keyevent(event){
  var rowIndex;
  var colIndex;

  // Shiftキーイベント
  if(event.shiftKey === true){
      shiftKeyEventHandler(event);
      return;
  }

  switch(event.keyCode){
    // Enter
    case 13: 
      moveDownCursol();
      break;
    case 37:
      /* 左カーソル移動 */
      moveLeftCursol();
      break;
    case 38:
      /* 上カーソル移動 */
      moveUpCursol();
      break;
    case 39:
      /* 右カーソル移動 */
      moveRightCursol();
      break;
    case 40:
      /* 下カーソル移動 */
      moveDownCursol();
      break;
    case 65: /* A */
      rowIndex = getCursolRowIndex();
      colIndex = getCursolColIndex();
      writeText("A",rowIndex,colIndex);
      break;
    default:
      break;
  }
  console.log("keyCode=" + event.keyCode);
  console.log("rowIndex=" + getCursolRowIndex() + " colIndex=" + getCursolColIndex());

}

/* カーソル左移動 */
function moveLeftCursol(){
  $('.cursol').css('left','-=' + yoko);
}
/* カーソル右移動 */
function moveRightCursol(){
  $('.cursol').css('left','+=' + yoko);
}
/* カーソル上移動 */
function moveUpCursol(){
  $('.cursol').css('top','-=' + tate);
}
/* カーソル下移動 */
function moveDownCursol(){
  $('.cursol').css('top','+=' + tate);
}

/* カーソル文字位置取得(横) */
function getCursolColIndex(){
 return $('.cursol').css('left').replace(/px/g,'')/yoko;
}
/* カーソル文字位置取得(行) */
function getCursolRowIndex(){
 return $('.cursol').css('top').replace(/px/g,'')/tate;
}

/* Shiftキーイベント */
function shiftKeyEventHandler(event){
  console.log("Shift Key Event :" + event.keyCode)
  switch(event.keyCode){
    case 37:
      /* 左カーソル移動 */
      selectRowBackward();
      break;
    case 38:
      /* 上カーソル移動 */
      // moveUpCursol();
      break;
    case 39:
      /* 右カーソル移動 */
      selectRightKey();
      break;
    case 40:
      /* 下カーソル移動 */
      moveDownCursol();
      break;
  }

}



/*
* テキスト書き込み
*/
function writeText(text,rowIndex,colIndex){
  var insetText;
  var rowStrLength = 0;
  console.log("Text:" + text + " rowIndex:" + rowIndex + " colIndex:" + colIndex);

  /* 対象行の表示文字をspanタグ単位で取得 */
  $('.line').eq(rowIndex).children('span').each(function(index,element){
    console.log($(element).text() + " length:" + $(element).text().length);

    // 挿入対象文字数か判定
    rowStrLength += $(element).text().length;
    if( rowStrLength >= colIndex + 1){

      text = insertStr($(element).text(),colIndex - rowStrLength,text);
      console.log("modify text:" + text);

      // 既存のメッセージを削除
      $(element).text('');
      $(element).text(text);

      // カーソルを右へ移動
      moveRightCursol();

      // 処理終了
      return false;
    }else{
      // 次のelement
      return true;
    }

  });
}

/* 文字列挿入 */
function insertStr(str, index, insert) {
  var result = str.slice(0, index) + insert + str.slice(index, str.length);
  return result;
}

/* 右選択 */
function selectRightKey(){
  console.log("selectRightKey:" + $('.selection').css('width'));
  // カーソル位置
  var cursolLeftIndex = $('.cursol').css('left').replace(/px/g,'')
  console.log("cursol left:" + cursolLeftIndex);

   // return $('.cursol').css('top').replace(/px/g,'')/tate;

  // if($('.selection').css('width').replace(/px/g,'') === "0px"){

  // }
  // $('.selection').css('width','+=' + (yoko));
}

/* 左選択 */
function selectRowBackward(){
  $('.selection').css('width','-=' + (yoko));
}
