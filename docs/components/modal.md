<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

# Modal

Модальное окно с совместимыми зонами `alert`, `form` и `footer`.

::: info Основа компонента
Компонент построен на [Modal из Ant Design Vue](https://antdv.com/components/modal).
:::

<div class="demo">
  <Button type="primary" @click="open = true">Открыть окно</Button>
  <Modal v-model:open="open" title="Редактирование">
    <template #form>Здесь располагается содержимое формы.</template>
    <template #footer><Button type="primary" @click="open = false">Готово</Button></template>
  </Modal>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Modal } from '@minitwiks/nsmp-vue-components'

const open = ref(false)
</script>

<template>
  <Button type="primary" @click="open = true">
    Открыть окно
  </Button>

  <Modal v-model:open="open" title="Редактирование">
    <template #form>
      Здесь располагается содержимое формы.
    </template>

    <template #footer>
      <Button type="primary" @click="open = false">
        Готово
      </Button>
    </template>
  </Modal>
</template>
```

Компонент принимает стандартные props Ant Design Vue Modal, кроме управляемого здесь `open`. Методы `show()` и `hidden()` доступны через template ref.
