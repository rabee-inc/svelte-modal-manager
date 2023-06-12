import type { SvelteComponentTyped } from "svelte";
import type { Writable } from 'svelte/store';
import type { DispatchOptions } from "svelte/internal";
import type { TransitionConfig } from "svelte/transition";

// REF: https://www.sunapro.com/tuple-type-check/
export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

export type Expect<T extends true> = T;


type OptionalProps<T> = { [K in keyof T]?: T[K] };

// Returns a type with the same well-known props, but without the index signature
type NoIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K]
}

// Omit from NoIndex version of T, and then intersects with the indexed part of it
type OmitFromKnownKeys<T, K extends keyof NoIndex<T>> = Omit<NoIndex<T>, K>;// & OnlyIndex<T>;

class DefaultComponent extends SvelteComponentTyped<>{ };

type IgnorePropKeys = keyof NoIndex<{
  [K in keyof DefaultComponent]: any;
}> | 'dispatch' | 'close' | 'awaitClose';

export type ModalConstructorProps<T> = OptionalProps<OmitFromKnownKeys<T, IgnorePropKeys>>;

export type ModalTransition = {
  /**
   * transition の種類。
   * 
   * e.g.   
   * `import { fly } from 'svelte/transition';`
   * 
   * `type: fly,`
   */
  type?: any,

  /**
   * transition に渡す props。
   * 
   * この部分に渡されるものです。
   * 
   * `transition:fly={props}`
   */
  props?: any,
};

type ModalPosition = {
  x?: 'left' | 'center' | 'right' | '' | undefined | null;
  y?: 'top' | 'middle' | 'bottom' | '' | undefined | null;
};

export type ModalContainerOptions = {
  /**
   * Esc キーや modal 外クリックで閉じるかどうかを指定します。
   * false を指定すると close 関数でしか閉じられなくなります。
   * 
   * ℹ️ modal の `export let dismissible` に代入するには、 `{ props: { dismissible } }` としてください。
   * @default true
   */
  dismissible?: boolean | undefined;
  
  /**
   * overlay の styles を指定できます。
   * 
   * ℹ️ modal の `export let overlay` に代入するには、 `{ props: { overlay } }` としてください。
   */
  overlay?: {
    styles: {
      background: string;
    };
  };
};

type ModalOpenOptions = {
  /** 
   * modal 開閉時の transition を指定できます。
   * 
   * ℹ️ modal の `export let transition` に代入するには、 `{ props: { transition } }` としてください。
   **/
  transition?: ModalTransition;

  /**
   * target を指定した場合に target からの相対位置として、どの位置に modal を開くかを指定します。
   * 
   * ℹ️ modal の `export let position` に代入するには、 `{ props: { position } }` としてください。
   * 
   * @default { x: 'center', y: 'middle' }
   */
  position?: ModalPosition,


  /**
   * modal を開いたときに modal の外枠に focus を当てるかどうかを指定します。
   * 
   * ℹ️ modal の `export let focus` に代入するには、 `{ props: { focus } }` としてください。
   * @default true
   */
  focus?: boolean;

  /**
   * timeout で指定した時間 (ms) 経過後に modal を閉じます。
   * 
  * ℹ️ modal の `export let timeout` に代入するには、 `{ props: { timeout } }` としてください。
   */
  timeout?: number;

} & ModalContainerOptions;

export type ModalModule<T> = ModalOpenOptions & {
  default: T;
};

export type CreateModalControllerArgument = Omit<ModalModule<any>, 'position'> & {
  position?: { x: string;  y: string};
};

export type ModalProps<T> = OptionalProps<OmitFromKnownKeys<T, IgnorePropKeys>>;
export type ModalOpenProps<T> = OptionalProps<OmitFromKnownKeys<ModalProps<T>, (keyof ModalOpenOptions) | "props">>
  & ModalOpenOptions
  & { props?: ModalProps<T> };

/** modal open のデフォルトとして指定できるパラメーター */
export type ModalDefaultOptions = ModalOpenOptions;

export class ModalComponent<T> extends SvelteComponentTyped<ModalConstructorProps<T>> {};

export type ModalComponentConstructor<T> = {
  new(props: ModalConstructorProps<T>): ModalComponent<T>;
};

export type ModalContext<T> = {
  /** modal を閉じ result を返します。 close イベントが発火します。 */
  readonly close: () => T;
  /** modal が閉じると resolve されます。 Promise<result> を返します。 */
  readonly awaitClose: () => Promise<T>;
  readonly isClosed: Writable<boolean>;
  readonly result: Writable<T>;
  readonly dispatch: <EventKey extends string>(type: EventKey, detail?: any) => void;
};

export type ModalProxy<P, R> = Pick<ModalContext<R>, "awaitClose" | "close"> & ModalConstructorProps<P> & Pick<P, '$on' | '$set'> & {
  /** modal が閉じているかどうか。 modal が閉じると true になります。 */
  readonly isClosed: boolean;
  /** 
   * modal の result。
   * 何が入るかは modal 側の実装によります。 
   * modal.close() や await modal.awaitClose() で取得できるものと同じです。
   */
  readonly result: R;
};

export type ModalController<T, R> = {
  readonly static: T,
  /** modal を開き modal のインスタンスを返します。 */
  readonly open: (props?: ModalOpenProps<InstanceType<T["default"]>>) => ModalProxy<InstanceType<T["default"]>, R>;
  /** modal を開き閉じるまで待ちます。(awaitClose() を実行したのと同じです。) */
  readonly openSync: (props?: ModalOpenProps<InstanceType<T["default"]>>) => Promise<R>;
};

export type ModalControllerProxy<T, R> = T & ModalController<T, R>;

export type ModalManagementItem<C, T> = {
  container?: C,
  context: ModalContext<T>
} & ModalContainerOptions;
