<template>
  <section class="bottom-content">
    <h1>Choose a format that fits.</h1>
    <div class="bottom-content__image">
      <img
        srcset="/img/OriginalRanch-ProductLockup.png 180w,
                /img/OriginalRanch-ProductLockup@2x.png 360w"
        sizes="(max-width: 600px) 180px,
                360px"
        src="/img/OriginalRanch-ProductLockup@2x.png"
        alt="Hidden Valley Ranch Product Lineup"
      >
    </div>
  </section>
</template>
<script>
export default {
  name: 'BottomContent'
}
</script>
