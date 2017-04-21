(function() {
    "use strict";

    var tabs = [],
        sections = [],
        tab_header = document.getElementsByClassName("tabs__header");

    /*** TABs ***/
    for (var i = 0; i < tab_header.length; i++) {
        for (var j = 0; j < tab_header[i].children.length; j++) {
            var el = tab_header[i].children[j];
            if (el.type === "radio") {
                tabs.push(el);
                var sectionID = "content-" + el.id,
                    section = document.getElementById(sectionID);
                sections.push(section);
            }
        }
    }

    tabs.forEach(function(item) {
        item.addEventListener("click", function() {
            var thisID = "content-" + this.id;
            sections.forEach(function(sect, i) {
                if (sect.id === thisID) sect.style.display = 'block';
                else sect.style.display = 'none';
            });
        });
    });
    /*** TABs - END ***/

}());