var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};

xhttp.open("GET", "feed.xml", true);
xhttp.send(null);

function myFunction(xml) {

    if (xhttp.status == 200) {
        var xmlDoc = xml.responseXML;
        var items = xmlDoc.getElementsByTagName("item");

        for (var index = 0, limit = items.length; index < limit; index++) {
            var item = items[index];
            
            var date = item.getElementsByTagName("pubDate");
            if (date && date[0] && date[0].childNodes && date[0].childNodes[0] && date[0].childNodes[0].nodeValue) {
                date = date[0].childNodes[0].nodeValue;
                date = new Date(date);
                date = date.getDate() + '/' + (date.getMonth() < 9?'0':'') + (date.getMonth()+1)+'/'+date.getYear();
            }
            else {
                date = false;
            }
            var title = item.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            var link = item.getElementsByTagName("link")[0].childNodes[0].nodeValue;
            var description = item.getElementsByTagName("description")[0].childNodes[0].nodeValue;

            var ul = document.querySelector('ul.noticias-lista');
            var li = document.createElement("LI");

            if (date) {
                var time = document.createElement("TIME");
                time.innerText = date;
                li.appendChild(time)
            }
            
            var h3 = document.createElement('H3');
            var h3_a = document.createElement('A');
            h3_a.setAttribute('target','_blank');
            h3_a.setAttribute('href', link);
            h3_a.innerText = title;
            h3.appendChild(h3_a);
            li.appendChild(h3);

            var p = document.createElement('P');
            p.innerText = description;
            li.appendChild(p);

            ul.appendChild(li);
        }

    } else if (xhttp.status == 404) {
        alert("XML could not be found");
    }
}
