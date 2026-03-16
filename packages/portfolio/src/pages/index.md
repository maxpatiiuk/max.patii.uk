<script>
  const link = document.querySelector("mp-home").shadowRoot.querySelector("header>nav>ul>li>a");
  if (link===null) console.error("Failed to find email link");
  else {
    const email = link.getAttribute('href').slice(1).split(",").map(c => String.fromCharCode(c)).join('');
    link.href = 'mailto:' + email;
    link.textContent = email;
  }
</script>
