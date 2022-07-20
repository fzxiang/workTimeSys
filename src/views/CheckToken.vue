<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'


const params = useUrlSearchParams('history')
console.log(params)
</script>
