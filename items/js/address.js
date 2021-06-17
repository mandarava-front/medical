function fn() {
    var select = document.getElementById("type");
    var c = select.value;
    var area = document.getElementById("area");
    switch (c) {
        case "A":
            area.innerHTML =
                "<option value='df1'>安徽省</option><option value='df2'>澳门</option>";
            break;
        case "B":
            area.innerHTML =
                "<option value='df1'>北京</option>";
            break;
        case "C":
            area.innerHTML = "<option value='df1>重庆</option>";
        case "F":
            area.innerHTML = "<option value='df1'>福建</option>";
            break;
        case "G":
            area.innerHTML =
                "<option value='df1'>贵州</option><option value='df1'>广东</option><option value='df1'>甘肃</option><option value='df1'>广西</option>";
            break;
        case "H":
            area.innerHTML =
                "<option value='df1'>黑龙江省</option><option value='df2'>河北省</option><option value='df1'>河南</option><option value='df1'>湖南</option><option value='df1'>湖北</option><option value='df1'>海南</option>";
            break;
        case "J":
            area.innerHTML =
                "<option value='df1'>吉林</option><option value='df1'>江苏</option><option value='df1'>江西</option>";
            break;
        case "L":
            area.innerHTML = "<option value='df1'>辽宁</option>";
            break;
        case "N":
            area.innerHTML = "<option value='df1'>内蒙</option><option value='df1'>宁夏</option>";
            break;
        case "Q":
            area.innerHTML = "<option value='df1'>青海</option>";
            break;
        case "S":
            area.innerHTML =
                "<option value='df1'>山西</option><option value='df1'>山东</option><option value='df1'>四川</option><option value='df1'>陕西</option><option value='df1'>上海</option>";
            break;
        case "T":
            area.innerHTML =
                "<option value='df1'>台湾</option><option value='df1'>天津</option>";
            break;
        case "X":
            area.innerHTML =
                "<option value='df1'>新疆</option><option value='df1'>西藏</option><option value='df1'>香港</option>";
            break;
        case "Y":
            area.innerHTML = "<option value='df1'>云南</option>";
            break;
        case "Z":
            area.innerHTML = "<option value='df1'>浙江</option>";
            break;
        default:
            alert("error");
    }
};

function bn() {
    var select = document.getElementById("area");
    var d = select.value;
    console.log(d)
    var df = document.getElementById("df");
    switch (d) {
        case "df1":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df2":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df3":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df4":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df5":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df6":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df7":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df8":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df9":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df10":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        case "df11":
            df.innerHTML = "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";

            break;
        case "df12":
            df.innerHTML =
                "<option>城市a</option><option>城市b</option><option>城市c</option><option>城市d</option><option >城市e</option><option >城市f</option><option >城市g</option>";
            break;
        default:
            alert("error");
    }
};