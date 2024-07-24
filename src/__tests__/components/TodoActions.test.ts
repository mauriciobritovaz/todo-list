import { mount } from '@vue/test-utils';
import { it , describe, expect, vi } from 'vitest';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TodoActions from '@/components/TodoActions.vue';

const vuetify = createVuetify({
  components,
  directives,
})

const mountTodoActions = () => {
  const wrapper = mount({
    template: '<div><TodoActions></TodoActions></div>'
  },
  {
    props: {},
    global: {
      components: {
        TodoActions,
      },
      plugins: [vuetify],
    }
  });
  return wrapper;
}

describe('TodoActions', () => {
  it('Mounts correctly', async () => {
    expect(mountTodoActions()).toBeTruthy();
    expect(mountTodoActions().text()).toContain('Desfazer seleção');
    expect(mountTodoActions().text()).toContain('Deletar todos os itens');
  })

  it('Clicks: Desfazer seleção', async () => {
    const undoBtn = mountTodoActions().find('[data-testid=undoSelected]');
    const spyUndo = vi.spyOn(undoBtn, 'trigger');
    await undoBtn.trigger('click');
    expect(spyUndo).toHaveBeenCalledOnce();

  })

  it('Clicks: Deletar todos os itens', async () => {
    const delBtn = mountTodoActions().find('[data-testid=deleteAll]');
    const spyDelete = vi.spyOn(delBtn, 'trigger');
    await delBtn.trigger('click');
    expect(spyDelete).toHaveBeenCalledOnce();

  })
})
