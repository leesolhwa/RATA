const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const attrs = (values = {}) => Object.entries(values)
  .filter(([, value]) => value !== false && value != null)
  .map(([key, value]) => value === true ? key : `${key}="${escapeHtml(value)}"`)
  .join(' ');

export const Button = ({ label, type = 'button', variant = 'primary', className = '', disabled = false, attributes = {} }) => `
  <button class="ui-button ui-button--${variant} ${className}" type="${type}" ${disabled ? 'disabled' : ''} ${attrs(attributes)}>${label}</button>`;

export const Input = ({ name, label, type = 'text', placeholder = '', autocomplete = '', required = false, hint = '', attributes = {} }) => `
  <label class="ui-field ${hint ? 'has-hint' : ''}" data-field="${name}">
    <span class="ui-field__label">${label}</span>
    <span class="ui-field__control">
      <input name="${name}" type="${type}" placeholder="${escapeHtml(placeholder)}" ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${required ? 'required' : ''} aria-describedby="${name}-message" ${attrs(attributes)}>
      ${type === 'password' ? `<button class="ui-field__reveal" type="button" data-reveal="${name}" aria-label="비밀번호 보기"><span aria-hidden="true">◉</span></button>` : ''}
    </span>
    <small class="ui-field__message" id="${name}-message">${hint}</small>
  </label>`;

export const Dialog = ({ id, title, body, confirmLabel = '확인', cancelLabel = '취소' }) => `
  <div class="ui-dialog" id="${id}" hidden>
    <button class="ui-dialog__backdrop" type="button" data-dialog-close aria-label="${title} 닫기"></button>
    <section class="ui-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
      <h2 id="${id}-title">${title}</h2><p>${body}</p>
      <div class="ui-dialog__actions">${Button({ label: cancelLabel, variant: 'secondary', attributes: { 'data-dialog-close': true } })}${Button({ label: confirmLabel, attributes: { 'data-dialog-confirm': true } })}</div>
    </section>
  </div>`;

export const BottomSheet = ({ id, title, body }) => `
  <aside class="ui-bottom-sheet" id="${id}" data-sheet-state="peek" aria-labelledby="${id}-title" hidden>
    <button class="ui-bottom-sheet__handle" type="button" aria-label="시트 높이 변경"><i></i></button>
    <h2 id="${id}-title">${title}</h2>${body}
  </aside>`;

export const Skeleton = ({ rows = 3 } = {}) => `<div class="ui-skeleton" role="status" aria-label="불러오는 중">${Array.from({ length: rows }, () => '<i></i>').join('')}</div>`;

const emptyBowlIcon = '<svg class="ui-state__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 19h32c0 12-6 20-16 20S8 31 8 19Z"/><path d="M14 43h20M17 13c0-4 4-4 4-8M27 14c0-4 4-4 4-8"/><path d="M16 25h16"/></svg>';
export const EmptyState = ({ title, description, action = '' }) => `<section class="ui-state ui-empty-state">${emptyBowlIcon}<h2>${title}</h2><p>${description}</p>${action}</section>`;

export const ErrorState = ({ title = '불러오지 못했어요', description = '잠시 후 다시 시도해주세요.', action = '' }) => `<section class="ui-state ui-error-state" role="alert"><strong aria-hidden="true">!</strong><h2>${title}</h2><p>${description}</p>${action}</section>`;

export const Toast = () => '<div class="toast" role="status" aria-live="polite" aria-atomic="true"></div>';
