<template>
    <div>
        <h3>Preview</h3>
        <pre>{{ record }}</pre>
    </div>
</template>

<script>
export default {
  name: "PreviewModal",
  props: {
    record: Object
  }
};
</script>
