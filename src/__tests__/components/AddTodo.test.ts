import { mount } from '@vue/test-utils';
import { it , describe, expect, vi } from 'vitest';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AddTodo from '@/components/AddTodo.vue';

const vuetify = createVuetify({
  components,
  directives,
})

const mountAddTodo = () => {
  const wrapper = mount({
    template: '<div><AddTodo></AddTodo></div>'
  },
  {
    props: {},
    global: {
      components: {
        AddTodo,
      },
      plugins: [vuetify],
    }
  });
  return wrapper;
}

describe('AddTodo',() => {
  it('Mounts correctly', async () => {
    expect(mountAddTodo()).toBeTruthy();
    expect(mountAddTodo().text()).toContain('Adicionar todo');
  })

  it('Calls OnEnter', async () => {
    const inputTodo = mountAddTodo().find('input');
    const spyTodo = vi.spyOn(inputTodo, 'trigger');
    await inputTodo.trigger('keyup.enter');

    expect(spyTodo).toHaveBeenCalledOnce();
  })

  it('Show the todo in the input component', async () => {
    const inputTodo = mountAddTodo().find('input');
    expect(inputTodo.text()).toContain('');
    await inputTodo.setValue('teste todo 1');
    expect(inputTodo.element.value).toEqual('teste todo 1');
  })
})
