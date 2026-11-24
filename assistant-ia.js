/* Bouton « Besoin d'aide ? » — ouvre l'assistant Gemini (Gem) de la séquence.
   Pour activer une séquence : coller le lien de partage du Gem ci-dessous.
   Si le lien est vide, le bouton ne s'affiche pas. */
(function () {
  var GEMS = {
    seq02: "https://gemini.google.com/gem/1s0RSU0wpZeRjklAQYD5ip5_xqTJRjz4O?usp=sharing" // Assistant SI – Séquence 2
  };

  var m = location.pathname.match(/\/(seq\d+)\//);
  var url = m && GEMS[m[1]];
  if (!url) return;

  var titre = (document.title || "cette activité").trim();
  var phrase = "Je travaille sur « " + titre + " ». Ma question : ";

  var css = document.createElement("style");
  css.textContent =
    "#aide-ia-btn{position:fixed;right:18px;bottom:84px;z-index:99999;border:0;border-radius:999px;padding:12px 18px;font:600 16px system-ui,sans-serif;color:#fff;background:#1a73e8;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer}" +
    "#aide-ia-btn:hover{background:#155fc2}" +
    "#aide-ia-box{position:fixed;right:18px;bottom:142px;z-index:99999;width:min(330px,calc(100vw - 36px));background:#fff;color:#222;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);padding:16px;font:15px/1.45 system-ui,sans-serif;display:none}" +
    "#aide-ia-box.ouvert{display:block}" +
    "#aide-ia-box h3{margin:0 0 8px;font-size:17px}" +
    "#aide-ia-box ol{margin:0 0 12px;padding-left:20px}" +
    "#aide-ia-box li{margin-bottom:4px}" +
    "#aide-ia-box .ia-row{display:flex;gap:8px;flex-wrap:wrap}" +
    "#aide-ia-box a,#aide-ia-box button{flex:1;text-align:center;border-radius:8px;padding:9px 10px;font:600 14px system-ui,sans-serif;cursor:pointer;text-decoration:none}" +
    "#aide-ia-box a{background:#1a73e8;color:#fff;border:0}" +
    "#aide-ia-box button{background:#eef3fd;color:#1a73e8;border:1px solid #c6d7f7}" +
    "#aide-ia-box small{display:block;margin-top:10px;color:#666}" +
    "@media print{#aide-ia-btn,#aide-ia-box{display:none!important}}";
  document.head.appendChild(css);

  var box = document.createElement("div");
  box.id = "aide-ia-box";
  box.innerHTML =
    "<h3>🤖 L'assistant de la séquence</h3>" +
    "<ol>" +
    "<li>Clique sur <b>Copier ma phrase</b>.</li>" +
    "<li>Ouvre l'assistant et colle la phrase.</li>" +
    "<li>Écris ta question et <b>ce que tu as déjà essayé</b>.</li>" +
    "</ol>" +
    "<div class='ia-row'>" +
    "<button type='button' id='aide-ia-copier'>📋 Copier ma phrase</button>" +
    "<a href='" + url + "' target='_blank' rel='noopener'>Ouvrir l'assistant ↗</a>" +
    "</div>" +
    "<small>Il te donne des indices, pas la réponse. Connecte-toi avec ton compte ert.tn.</small>";
  document.body.appendChild(box);

  var btn = document.createElement("button");
  btn.id = "aide-ia-btn";
  btn.type = "button";
  btn.textContent = "🤖 Besoin d'aide ?";
  btn.onclick = function () { box.classList.toggle("ouvert"); };
  document.body.appendChild(btn);

  document.getElementById("aide-ia-copier").onclick = function () {
    var b = this;
    function ok() { b.textContent = "✅ Copié !"; setTimeout(function () { b.textContent = "📋 Copier ma phrase"; }, 2000); }
    try {
      navigator.clipboard.writeText(phrase).then(ok, function () { prompt("Copie cette phrase :", phrase); });
    } catch (e) { prompt("Copie cette phrase :", phrase); }
  };
})();
