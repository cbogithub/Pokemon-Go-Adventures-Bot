/**
 * Created by cqian19 on 7/30/2016.
 */

var lastxp = 0;

function getPlayerData(cb, f) {
    $.ajax({
        url: 'playerData',
        type: 'GET',
        dataType: 'json'
    }).done(function(r) {
        requester(r, arguments.callee.name, cb);
    }).fail(f);
}

function parsePlayerData(playerData) {
    console.log(playerData);
    var card = $(".playerCard");
    var image = card.find(".playerImage");
    var avaName = imagePath + 'trainer' + (playerData.gender == 'Male' ? 'M' : 'F') + '.png';
    if (image.attr("src") != avaName) {
        image.attr("src", avaName)
    }
    var name = card.find(".playerName");
    var username = playerData.username + " Lv. " + playerData.level;
    if (name.text() != username) {
        name.text(username);
    }
    var exp = card.find(".exp");
    var expText = "Exp:  " + playerData.xp + " / " + playerData.maxXp;
    var expBar = $(".xpBar");
    if (exp.text() != expText) {
        exp.text(expText);
        var xpInt = parseInt(playerData.xp);
        percent = 100 * xpInt / parseInt(playerData.maxXp);
        if (xpInt != lastxp) {
            if (xpInt > lastxp) {
                 $(expBar).animate({
                    width: percent + '%'
                 }, 500, 'easeOutQuart')
            } else {
                 $(expBar).animate({
                    width: '100%'
                 }, 2000, 'easeOutQuart', function() {
                     expBar.attr('width', percent + '%');
                 })
            }
            lastxp = xpInt;
        }

    }
    var stardust = card.find("#stardust");
    var sdamount = "Stardust:  " + playerData.stardust;
    if (stardust.text() != sdamount) {
        stardust.text(sdamount);
    }
    var pokecoin = card.find("#pokecoin");
    var pcamount = "Pokecoins:  " + playerData.pokecoin;
    if (pokecoin.text() != pcamount){
        pokecoin.text(pcamount);
    }
}

function update() {
    getPlayerData(parsePlayerData, function() { console.log("Get player info failed"); });
}
update()
setInterval(update, 3000);