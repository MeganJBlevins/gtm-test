<template>
  <footer class="footer">
    <div class="footer__container">
      <p class="disclaimer">
        Hidden Valley<sup>&reg;</sup> and Hidden Valley<sup>&reg;</sup> Original Ranch<sup>&reg;</sup> are registered trademarks of The HV Food Products Company and used under license by Ventura Foods. <br><br>
        All other logos are registered trademarks of<br> Ventura Foods, LLC, Brea, CA 92821 USA.
      </p>
      <p class="privacy">
        <a href="https://www.venturafoods.com/privacy-policy/" target="_blank">Privacy Policy</a>
      </p>
      <VenturaLogo />
    </div>
  </footer>
</template>

<script>
import VenturaLogo from './UI/VenturaLogo'

export default {
  name: 'TheFooter',
  components: {
    VenturaLogo
  }
}
</script>
