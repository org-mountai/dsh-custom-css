window.__ModuleLoader__.load({
  id: 'dsh-custom-css',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const STYLE_ID = 'dsh-custom-css-style';
    const STORAGE_KEY = 'dsh-custom-css';

    function loadCss() {
      try {
        return localStorage.getItem(STORAGE_KEY) || '';
      } catch (error) {
        return '';
      }
    }

    function saveCss(css) {
      try {
        localStorage.setItem(STORAGE_KEY, css);
      } catch (error) {
        /* private mode, quota — the CSS still applies for this page */
      }
    }

    function paint(css) {
      let el = document.getElementById(STYLE_ID);
      if (!el) {
        el = document.createElement('style');
        el.id = STYLE_ID;
        document.head.appendChild(el);
      }
      if (el.textContent !== css) el.textContent = css;
    }

    const labelStyle = {
      margin: 0,
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--dsw-alias-label-secondary)',
    };

    function CustomCssPage() {
      const [css, setCss] = React.useState(loadCss);

      React.useEffect(() => {
        saveCss(css);
        paint(css);
      }, [css]);

      return h(
        'div',
        { style: { display: 'grid', gap: 12, padding: '4px 0 24px', maxWidth: 860 } },
        h(
          'p',
          { style: labelStyle },
          'Eigenes CSS für diese Oberfläche. Es wird nach allen Skin-Regeln eingefügt, gilt also auch gegen eingebaute Styles. Gespeichert wird im Browser, nicht auf dem Server.',
        ),
        h('textarea', {
          value: css,
          onChange: (event) => setCss(event.target.value),
          spellCheck: false,
          placeholder:
            '/* Beispiele */\n' +
            ':root { --dsw-radius-md: 2px; --dsw-radius-lg: 4px; }\n' +
            'body { --dsh-font-family-text: "Atkinson Hyperlegible Next"; }\n' +
            '.sidebar { display: none; }',
          style: {
            width: '100%',
            minHeight: 360,
            padding: 12,
            borderRadius: 8,
            border: '1px solid var(--dsw-alias-border-l2)',
            background: 'var(--dsw-alias-bg-layer-1)',
            color: 'var(--dsw-alias-label-primary)',
            fontFamily: 'var(--ds-font-family-code, ui-monospace, SFMono-Regular, monospace)',
            fontSize: 13,
            lineHeight: 1.6,
            resize: 'vertical',
          },
        }),
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          h(
            'button',
            {
              type: 'button',
              onClick: () => setCss(''),
              style: {
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid var(--dsw-alias-border-l2)',
                background: 'transparent',
                color: 'var(--dsw-alias-label-primary)',
                fontSize: 13,
                cursor: 'pointer',
              },
            },
            'Zurücksetzen',
          ),
          h('span', { style: { ...labelStyle, fontSize: 12 } }, css.length + ' Zeichen'),
        ),
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        paint(loadCss());

        if (typeof ctx.effect === 'function') {
          ctx.effect(() => () => {
            const el = document.getElementById(STYLE_ID);
            if (el) el.remove();
          });
        }

        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            { name: 'settings.section', id: 'dsh-custom-css', order: 60, label: 'Eigenes CSS' },
            CustomCssPage,
          ),
        );
      },
    };
  },
});
