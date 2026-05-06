import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useAriaStore, m as motion, A as AnimatePresence, C as ChevronRight, a as ChevronLeft } from "./index-Khuvrpqq.js";
import { u as useDirection, P as Primitive, a as Presence, c as createContextScope, b as composeEventHandlers, d as useCallbackRef, e as useLayoutEffect2 } from "./index-Bdl_K8gq.js";
import { u as useComposedRefs, c as cn } from "./utils-Cd0OWsoi.js";
import { c as clamp, M as MicOff } from "./index-BC-VUtnR.js";
import { S as Skeleton } from "./skeleton-Du1tc8iA.js";
import { u as useCreateChain, a as useRunChain, b as useActiveStream } from "./useStreaming-DIGIUmgN.js";
import { u as useGetHistory, a as useSendMessage, b as useClearHistory, s as speakText } from "./useConversation-ClGi6Ix9.js";
import { s as stopSpeaking, L as LANG_CODES, a as startSpeechRecognition } from "./useVoice-CqPdfCbn.js";
import { T as Trash2 } from "./trash-2-BpPdCVwr.js";
import { S as Send } from "./send-D1wP-YNk.js";
import { M as Mic } from "./mic-DTkU6c4e.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
import { C as CircleCheck } from "./circle-check-DKp6tXQ-.js";
import { C as Clock } from "./clock-Cvc138nV.js";
import "./clsx-DgYk2OaC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode);
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const MOOD_COLORS = {
  idle: "oklch(0.7 0.18 200 / 0.12)",
  speaking: "oklch(0.85 0.2 200 / 0.16)",
  thinking: "oklch(0.58 0.17 282 / 0.14)",
  happy: "rgba(57,255,20,0.12)",
  alert: "oklch(0.65 0.25 27 / 0.14)"
};
const MOOD_BADGE_COLOR = {
  idle: "oklch(0.7 0.18 200)",
  speaking: "oklch(0.85 0.2 200)",
  thinking: "oklch(0.58 0.17 282)",
  happy: "#39FF14",
  alert: "oklch(0.65 0.25 27)"
};
const MOOD_GLOW_SPREAD = {
  idle: "0 0 8px oklch(0.7 0.18 200 / 0.6), 0 0 24px oklch(0.7 0.18 200 / 0.25), inset 0 0 8px oklch(0.7 0.18 200 / 0.05)",
  speaking: "0 0 20px oklch(0.85 0.2 200 / 0.9), 0 0 50px oklch(0.85 0.2 200 / 0.5), inset 0 0 12px oklch(0.85 0.2 200 / 0.1)",
  thinking: "0 0 12px oklch(0.58 0.17 282 / 0.7), 0 0 30px oklch(0.58 0.17 282 / 0.3), inset 0 0 10px oklch(0.58 0.17 282 / 0.08)",
  happy: "0 0 16px rgba(57,255,20,0.75), 0 0 40px rgba(57,255,20,0.35), inset 0 0 10px rgba(57,255,20,0.08)",
  alert: "0 0 24px oklch(0.65 0.25 27 / 0.85), 0 0 55px oklch(0.65 0.25 27 / 0.4), inset 0 0 12px oklch(0.65 0.25 27 / 0.1)"
};
const MOOD_GLOW_PULSE = {
  idle: "0 0 12px oklch(0.7 0.18 200 / 0.75), 0 0 32px oklch(0.7 0.18 200 / 0.35), inset 0 0 8px oklch(0.7 0.18 200 / 0.06)",
  speaking: "0 0 30px oklch(0.85 0.2 200 / 1), 0 0 70px oklch(0.85 0.2 200 / 0.65), inset 0 0 16px oklch(0.85 0.2 200 / 0.15)",
  thinking: "0 0 18px oklch(0.58 0.17 282 / 0.8), 0 0 40px oklch(0.58 0.17 282 / 0.4), inset 0 0 12px oklch(0.58 0.17 282 / 0.1)",
  happy: "0 0 24px rgba(57,255,20,0.9), 0 0 55px rgba(57,255,20,0.5), inset 0 0 14px rgba(57,255,20,0.12)",
  alert: "0 0 35px oklch(0.65 0.25 27 / 1), 0 0 75px oklch(0.65 0.25 27 / 0.55), inset 0 0 16px oklch(0.65 0.25 27 / 0.14)"
};
const MOOD_BORDER = {
  idle: "oklch(0.7 0.18 200 / 0.55)",
  speaking: "oklch(0.85 0.2 200 / 0.9)",
  thinking: "oklch(0.58 0.17 282 / 0.65)",
  happy: "rgba(57,255,20,0.75)",
  alert: "oklch(0.65 0.25 27 / 0.85)"
};
const MOOD_GLOW_SPEED = {
  idle: 3,
  speaking: 0.5,
  thinking: 2,
  happy: 1.5,
  alert: 0.35
};
function PriyaAvatar({
  className = "",
  height = 480
}) {
  const w = height * 3 / 5;
  const { avatarMood, isSpeaking } = useAriaStore();
  const [gazeOffset, setGazeOffset] = reactExports.useState({ x: 0, y: 0 });
  const gazeTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (avatarMood !== "idle") {
      setGazeOffset({ x: 0, y: 0 });
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
      return;
    }
    const scheduleGaze = () => {
      const delay = 3e3 + Math.random() * 2e3;
      gazeTimerRef.current = setTimeout(() => {
        setGazeOffset({
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 4
        });
        scheduleGaze();
      }, delay);
    };
    scheduleGaze();
    return () => {
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
    };
  }, [avatarMood]);
  const isSpeakingMode = isSpeaking || avatarMood === "speaking";
  const bodyAnim = isSpeakingMode ? { scale: [1, 1.03, 1] } : avatarMood === "idle" ? { scaleY: [1, 1.015, 1], scaleX: [1, 0.985, 1] } : { scale: 1 };
  const bodyTransition = isSpeakingMode ? {
    duration: 0.4,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut"
  } : avatarMood === "idle" ? {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut"
  } : { duration: 0.4 };
  const glowSpread = MOOD_GLOW_SPREAD[avatarMood] ?? MOOD_GLOW_SPREAD.idle;
  const glowPulse = MOOD_GLOW_PULSE[avatarMood] ?? MOOD_GLOW_PULSE.idle;
  const borderColor = MOOD_BORDER[avatarMood] ?? MOOD_BORDER.idle;
  const ambientColor = MOOD_COLORS[avatarMood] ?? MOOD_COLORS.idle;
  const badgeColor = MOOD_BADGE_COLOR[avatarMood] ?? MOOD_BADGE_COLOR.idle;
  const glowSpeed = MOOD_GLOW_SPEED[avatarMood] ?? 3;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative flex items-center justify-center ${className}`,
      style: { width: w, height },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-2xl pointer-events-none",
            style: {
              background: `radial-gradient(ellipse 85% 90% at 50% 45%, ${ambientColor} 0%, transparent 68%)`,
              transition: "background 0.5s ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 rounded-2xl pointer-events-none",
            animate: {
              boxShadow: [glowSpread, glowPulse, glowSpread],
              borderColor
            },
            transition: {
              duration: glowSpeed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              borderColor: { duration: 0.5, ease: "easeInOut" },
              boxShadow: {
                duration: glowSpeed,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }
            },
            style: {
              border: `2px solid ${borderColor}`,
              boxShadow: glowSpread
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: {
              x: avatarMood === "idle" ? gazeOffset.x : 0,
              y: avatarMood === "idle" ? gazeOffset.y : 0
            },
            transition: { duration: 1.8, ease: "easeInOut" },
            style: { display: "flex", width: w, height },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: bodyAnim,
                transition: bodyTransition,
                style: {
                  width: w,
                  height,
                  transformOrigin: "center bottom",
                  display: "flex"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    viewBox: "0 0 300 500",
                    width: w,
                    height,
                    xmlns: "http://www.w3.org/2000/svg",
                    role: "img",
                    "aria-label": "Priya — AI assistant portrait",
                    style: {
                      display: "block",
                      filter: "drop-shadow(0 0 18px oklch(0.7 0.18 200 / 0.5))"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "bg-glow", cx: "50%", cy: "40%", r: "55%", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "stop",
                            {
                              offset: "0%",
                              stopColor: "oklch(0.7 0.18 200)",
                              stopOpacity: "0.10"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "transparent", stopOpacity: "0" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "skin", x1: "0", y1: "0", x2: "0.3", y2: "1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#f9dfc5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#edc49a" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "hair-base", x1: "0", y1: "0", x2: "0.4", y2: "1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#5c3317" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#3d1f0a" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#2a1206" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "hair-shine", x1: "0", y1: "0", x2: "1", y2: "0.3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#a0622a", stopOpacity: "0.6" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#5c3317", stopOpacity: "0" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "dress", x1: "0", y1: "0", x2: "0.3", y2: "1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#1e7de0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#1565c0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#0d47a1" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "dress-sheen", x1: "0", y1: "0", x2: "1", y2: "0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#64b5f6", stopOpacity: "0.35" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#1e7de0", stopOpacity: "0" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "wedge", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#8b6914" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#5d430c" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "iris", cx: "45%", cy: "38%", r: "55%", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#5e3a1a" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "70%", stopColor: "#3b2008" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#1a0d03" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "pattern",
                          {
                            id: "scanlines",
                            x: "0",
                            y: "0",
                            width: "300",
                            height: "3",
                            patternUnits: "userSpaceOnUse",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "rect",
                              {
                                width: "300",
                                height: "1",
                                fill: "oklch(0.7 0.18 200)",
                                fillOpacity: "0.04"
                              }
                            )
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "300", height: "500", fill: "url(#bg-glow)", rx: "18" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "136",
                          y: "178",
                          width: "28",
                          height: "52",
                          rx: "10",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "ellipse",
                        {
                          cx: "150",
                          cy: "228",
                          rx: "18",
                          ry: "5",
                          fill: "#0d47a1",
                          fillOpacity: "0.35"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "252", rx: "36", ry: "22", fill: "url(#dress)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "200", cy: "252", rx: "36", ry: "22", fill: "url(#dress)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "64",
                          y: "252",
                          width: "26",
                          height: "80",
                          rx: "13",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "210",
                          y: "252",
                          width: "26",
                          height: "80",
                          rx: "13",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "62",
                          y: "328",
                          width: "22",
                          height: "70",
                          rx: "11",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "216",
                          y: "328",
                          width: "22",
                          height: "70",
                          rx: "11",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "73", cy: "406", rx: "11", ry: "14", fill: "url(#skin)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "227", cy: "406", rx: "11", ry: "14", fill: "url(#skin)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 100 245 Q 80 250 75 270 L 72 380 Q 90 390 150 390 Q 210 390 228 380 L 225 270 Q 220 250 200 245 Z",
                          fill: "url(#dress)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 100 245 Q 80 250 75 270 L 72 380 Q 90 390 150 390 Q 210 390 228 380 L 225 270 Q 220 250 200 245 Z",
                          fill: "url(#dress-sheen)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 128 232 L 150 260 L 172 232",
                          fill: "none",
                          stroke: "#0d47a1",
                          strokeWidth: "1.5"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 72 340 Q 100 350 150 350 Q 200 350 228 340 L 228 380 Q 200 390 150 390 Q 100 390 72 380 Z",
                          fill: "#0d47a1",
                          fillOpacity: "0.45"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "80",
                          y: "298",
                          width: "140",
                          height: "8",
                          rx: "4",
                          fill: "#0d47a1",
                          fillOpacity: "0.6"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "104",
                          y: "388",
                          width: "34",
                          height: "52",
                          rx: "14",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "162",
                          y: "388",
                          width: "34",
                          height: "52",
                          rx: "14",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "106",
                          y: "436",
                          width: "28",
                          height: "46",
                          rx: "12",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "166",
                          y: "436",
                          width: "28",
                          height: "46",
                          rx: "12",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "104",
                          y: "478",
                          width: "32",
                          height: "8",
                          rx: "4",
                          fill: "url(#wedge)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 100 486 Q 105 494 136 494 L 136 492 Q 108 492 104 486 Z",
                          fill: "url(#wedge)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "164",
                          y: "478",
                          width: "32",
                          height: "8",
                          rx: "4",
                          fill: "url(#wedge)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 160 486 Q 165 494 196 494 L 196 492 Q 168 492 164 486 Z",
                          fill: "url(#wedge)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "150", cy: "148", rx: "58", ry: "66", fill: "url(#skin)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 104 162 Q 105 196 150 210 Q 195 196 196 162",
                          fill: "url(#skin)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 92 82 Q 70 100 68 145 Q 65 200 62 280 Q 70 320 80 360 Q 88 280 86 200 Q 90 150 96 110 Z",
                          fill: "url(#hair-base)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 208 82 Q 230 100 232 145 Q 235 200 238 280 Q 230 320 220 360 Q 212 280 214 200 Q 210 150 204 110 Z",
                          fill: "url(#hair-base)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "150", cy: "90", rx: "66", ry: "52", fill: "url(#hair-base)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "130", cy: "72", rx: "30", ry: "16", fill: "url(#hair-shine)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 94 108 Q 82 140 80 180 Q 78 230 76 280 Q 82 300 88 320 Q 80 240 84 180 Q 86 140 96 115 Z",
                          fill: "#3d1f0a"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 206 108 Q 218 140 220 180 Q 222 230 224 280 Q 218 300 212 320 Q 220 240 216 180 Q 214 140 204 115 Z",
                          fill: "#3d1f0a"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 148 58 Q 150 75 148 95",
                          stroke: "#7a4820",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          fill: "none",
                          opacity: "0.4"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 120 122 Q 131 117 142 120",
                          stroke: "#3d1f0a",
                          strokeWidth: "3",
                          fill: "none",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 158 120 Q 169 117 180 122",
                          stroke: "#3d1f0a",
                          strokeWidth: "3",
                          fill: "none",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "131", cy: "140", rx: "13", ry: "9", fill: "#fafafa" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "131", cy: "140", r: "7", fill: "url(#iris)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "131", cy: "140", r: "3.5", fill: "#0d0905" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "133.5",
                          cy: "137.5",
                          r: "1.8",
                          fill: "white",
                          fillOpacity: "0.85"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 118 133 Q 131 129 144 133",
                          stroke: "#c08060",
                          strokeWidth: "1.2",
                          fill: "none",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 118 147 Q 131 151 144 147",
                          stroke: "#5c3317",
                          strokeWidth: "1",
                          fill: "none",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "169", cy: "140", rx: "13", ry: "9", fill: "#fafafa" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "169", cy: "140", r: "7", fill: "url(#iris)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "169", cy: "140", r: "3.5", fill: "#0d0905" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "171.5",
                          cy: "137.5",
                          r: "1.8",
                          fill: "white",
                          fillOpacity: "0.85"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 156 133 Q 169 129 182 133",
                          stroke: "#c08060",
                          strokeWidth: "1.2",
                          fill: "none",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 156 147 Q 169 151 182 147",
                          stroke: "#5c3317",
                          strokeWidth: "1",
                          fill: "none",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: 121,
                          y1: "131",
                          x2: 120,
                          y2: "126",
                          stroke: "#1a0d03",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: 127,
                          y1: "131",
                          x2: 126,
                          y2: "126",
                          stroke: "#1a0d03",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: 133,
                          y1: "131",
                          x2: 132,
                          y2: "126",
                          stroke: "#1a0d03",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: 139,
                          y1: "131",
                          x2: 138,
                          y2: "126",
                          stroke: "#1a0d03",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: 159,
                          y1: "131",
                          x2: 158,
                          y2: "126",
                          stroke: "#1a0d03",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: 165,
                          y1: "131",
                          x2: 164,
                          y2: "126",
                          stroke: "#1a0d03",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: 171,
                          y1: "131",
                          x2: 170,
                          y2: "126",
                          stroke: "#1a0d03",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: 177,
                          y1: "131",
                          x2: 176,
                          y2: "126",
                          stroke: "#1a0d03",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 150 148 Q 146 165 142 172 Q 150 176 158 172 Q 154 165 150 148",
                          fill: "#e8b888",
                          fillOpacity: "0.5"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "ellipse",
                        {
                          cx: "144",
                          cy: "172",
                          rx: "4",
                          ry: "3",
                          fill: "#d4956a",
                          fillOpacity: "0.5"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "ellipse",
                        {
                          cx: "156",
                          cy: "172",
                          rx: "4",
                          ry: "3",
                          fill: "#d4956a",
                          fillOpacity: "0.5"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 136 188 Q 150 198 164 188 Q 158 205 150 207 Q 142 205 136 188 Z",
                          fill: "#c0625e"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 136 188 Q 143 182 150 183 Q 157 182 164 188 Q 157 185 150 185 Q 143 185 136 188 Z",
                          fill: "#b0514e"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "ellipse",
                        {
                          cx: "150",
                          cy: "195",
                          rx: "8",
                          ry: "3.5",
                          fill: "white",
                          fillOpacity: "0.18"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "ellipse",
                        {
                          cx: "116",
                          cy: "160",
                          rx: "16",
                          ry: "9",
                          fill: "#f4a0a0",
                          fillOpacity: "0.22"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "ellipse",
                        {
                          cx: "184",
                          cy: "160",
                          rx: "16",
                          ry: "9",
                          fill: "#f4a0a0",
                          fillOpacity: "0.22"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "94",
                          cy: "155",
                          r: "4",
                          fill: "oklch(0.7 0.18 200)",
                          fillOpacity: "0.9"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "94", cy: "155", r: "2", fill: "white", fillOpacity: "0.6" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "206",
                          cy: "155",
                          r: "4",
                          fill: "oklch(0.7 0.18 200)",
                          fillOpacity: "0.9"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "206", cy: "155", r: "2", fill: "white", fillOpacity: "0.6" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          width: "300",
                          height: "500",
                          fill: "url(#scanlines)",
                          rx: "18",
                          pointerEvents: "none"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "70",
                          y: "460",
                          width: "160",
                          height: "22",
                          rx: "11",
                          fill: "oklch(0.7 0.18 200)",
                          fillOpacity: "0.10"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "text",
                        {
                          x: "150",
                          y: "475",
                          textAnchor: "middle",
                          fontFamily: "monospace",
                          fontSize: "10",
                          fill: "oklch(0.7 0.18 200)",
                          fillOpacity: "0.85",
                          letterSpacing: "3",
                          children: "PRIYA · ONLINE"
                        }
                      )
                    ]
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isSpeakingMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute pointer-events-none rounded-full",
            style: {
              bottom: `${height * 0.38}px`,
              left: "50%",
              transform: "translateX(-50%)",
              width: `${w * 0.28}px`,
              height: `${height * 0.08}px`,
              background: "oklch(0.85 0.2 200 / 0.1)"
            },
            animate: { opacity: [0, 0.15, 0] },
            transition: {
              duration: 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            },
            initial: { opacity: 0 },
            exit: { opacity: 0 }
          },
          "lipsync"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase px-3 py-0.5 rounded-full pointer-events-none",
            style: {
              background: `${ambientColor}`,
              border: `1px solid ${borderColor}`,
              color: badgeColor,
              transition: "all 0.5s ease"
            },
            children: avatarMood
          }
        )
      ]
    }
  );
}
const LAYERS = [3, 5, 7, 5, 3];
const SVG_W = 600;
const SVG_H = 130;
const NODE_R = 6;
const LAYER_X_STEP = SVG_W / (LAYERS.length + 1);
function getNodes() {
  return LAYERS.map((count, li) => {
    const x = LAYER_X_STEP * (li + 1);
    return Array.from({ length: count }, (_, ni) => {
      const y = SVG_H / (count + 1) * (ni + 1);
      return { x, y, id: `n-${li}-${ni}` };
    });
  });
}
function getEdges(nodes) {
  const edges = [];
  for (let li = 0; li < nodes.length - 1; li++) {
    for (const a of nodes[li]) {
      for (const b of nodes[li + 1]) {
        edges.push({
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
          id: `e-${a.id}-${b.id}`
        });
      }
    }
  }
  return edges;
}
const NODES = getNodes();
const EDGES = getEdges(NODES);
const PARTICLE_EDGES = EDGES.filter((_, i) => i % 3 === 0);
function QuantumBrain({ isVisible }) {
  const [slowed, setSlowed] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isVisible) {
      setSlowed(false);
      timerRef.current = setTimeout(() => setSlowed(true), 2e3);
    } else {
      setSlowed(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible]);
  const pulseDuration = slowed ? "2.4s" : "0.9s";
  const particleDuration = slowed ? "2.8s" : "1.1s";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "quantum_brain.panel",
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.35, ease: "easeOut" },
      style: {
        width: "100%",
        height: "150px",
        background: "#0a0a1a",
        borderRadius: "12px",
        border: "1px solid rgba(0,220,255,0.45)",
        boxShadow: "0 0 18px rgba(0,220,255,0.18), inset 0 0 24px rgba(0,220,255,0.04)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: `0 0 ${SVG_W} ${SVG_H}`,
            preserveAspectRatio: "xMidYMid meet",
            style: {
              width: "100%",
              height: "118px",
              position: "absolute",
              top: 0,
              left: 0
            },
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "qb-grad-cyan", cx: "50%", cy: "50%", r: "50%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#00eeff", stopOpacity: "0.95" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#7c3aed", stopOpacity: "0.5" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "qb-grad-purple", cx: "50%", cy: "50%", r: "50%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#a855f7", stopOpacity: "0.95" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#00d4ff", stopOpacity: "0.4" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "qb-glow", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "2.5", result: "blur" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
                  ] })
                ] }),
                PARTICLE_EDGES.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    id: `qbpath-${e.id}`,
                    d: `M${e.x1},${e.y1} L${e.x2},${e.y2}`,
                    fill: "none"
                  },
                  `path-${e.id}`
                ))
              ] }),
              EDGES.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: e.x1,
                  y1: e.y1,
                  x2: e.x2,
                  y2: e.y2,
                  stroke: "rgba(0,220,255,0.12)",
                  strokeWidth: "0.75"
                },
                e.id
              )),
              PARTICLE_EDGES.map((e, pi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  r: "3",
                  fill: "#00eeff",
                  filter: "url(#qb-glow)",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "animateMotion",
                    {
                      href: `#qbpath-${e.id}`,
                      dur: particleDuration,
                      begin: `${pi * 0.18 % 2}s`,
                      repeatCount: "indefinite",
                      calcMode: "linear"
                    }
                  )
                },
                `particle-${e.id}`
              )),
              NODES.map(
                (layer, li) => layer.map((node, ni) => {
                  const isMidLayer = li === 2;
                  const grad = ni % 2 === 0 ? "url(#qb-grad-cyan)" : "url(#qb-grad-purple)";
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "circle",
                      {
                        cx: node.x,
                        cy: node.y,
                        r: NODE_R + 4,
                        fill: "none",
                        stroke: isMidLayer ? "rgba(168,85,247,0.3)" : "rgba(0,220,255,0.2)",
                        strokeWidth: "1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "animate",
                            {
                              attributeName: "r",
                              values: `${NODE_R + 3};${NODE_R + 7};${NODE_R + 3}`,
                              dur: pulseDuration,
                              begin: `${(li * 0.15 + ni * 0.08) % 1.5}s`,
                              repeatCount: "indefinite"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "animate",
                            {
                              attributeName: "opacity",
                              values: "0.5;0.15;0.5",
                              dur: pulseDuration,
                              begin: `${(li * 0.15 + ni * 0.08) % 1.5}s`,
                              repeatCount: "indefinite"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("circle", { cx: node.x, cy: node.y, r: NODE_R, fill: grad, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "animate",
                        {
                          attributeName: "r",
                          values: `${NODE_R};${NODE_R + 2};${NODE_R}`,
                          dur: pulseDuration,
                          begin: `${(li * 0.15 + ni * 0.08) % 1.5}s`,
                          repeatCount: "indefinite"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "animate",
                        {
                          attributeName: "opacity",
                          values: "0.85;1;0.85",
                          dur: pulseDuration,
                          begin: `${(li * 0.15 + ni * 0.08) % 1.5}s`,
                          repeatCount: "indefinite"
                        }
                      )
                    ] })
                  ] }, node.id);
                })
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BlinkingLabel, {})
      ]
    }
  ) });
}
function BlinkingLabel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      style: {
        position: "absolute",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: "10px",
        letterSpacing: "0.2em",
        color: "#00eeff",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        animation: "qb-blink 1.2s step-end infinite",
        textShadow: "0 0 8px rgba(0,238,255,0.7)"
      },
      children: [
        "◈ ARIA PROCESSING ◈",
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes qb-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
      ` })
      ]
    }
  );
}
const LIME = "#39FF14";
const LANG_LABELS = {
  english: "EN",
  hindi: "हिन्दी",
  nagpuri: "NA"
};
const AGENT_STEPS = ["Planner", "Research", "Executor", "Critic"];
const HAPPY_KEYWORDS = [
  "thank",
  "thanks",
  "great",
  "perfect",
  "excellent",
  "awesome",
  "amazing",
  "wonderful",
  "love",
  "fantastic",
  "brilliant"
];
function detectHappy(text) {
  const l = text.toLowerCase();
  return HAPPY_KEYWORDS.some((k) => l.includes(k));
}
function SpeakingWaveform() {
  const bars = [0.45, 0.8, 1, 0.7, 0.5];
  const barIds = ["b0", "b1", "b2", "b3", "b4"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.85 },
      className: "flex justify-start mb-4",
      "data-ocid": "chat.priya_speaking_indicator",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 glass-panel border-primary/30 rounded-2xl px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-3.5 h-3.5 text-primary/70 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-[3px] h-6", children: bars.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "w-[3px] rounded-full",
            style: { background: "oklch(0.7 0.18 200)", minHeight: 3 },
            animate: {
              height: [
                `${h * 12}px`,
                `${h * 22}px`,
                `${h * 8}px`,
                `${h * 20}px`,
                `${h * 12}px`
              ]
            },
            transition: {
              duration: 0.7 + i * 0.05,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.09
            }
          },
          barIds[i]
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary/60 tracking-widest", children: "PRIYA" })
      ] })
    }
  );
}
function UserBubble({ message, index }) {
  const tsMs = Number(message.timestamp / BigInt(1e6));
  const timeStr = new Date(tsMs).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 20, scale: 0.96 },
      animate: { opacity: 1, x: 0, scale: 1 },
      transition: { duration: 0.25, delay: Math.min(index * 0.03, 0.2) },
      className: "flex justify-end mb-4",
      "data-ocid": `chat.message.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "max-w-[76%] rounded-2xl px-4 py-3 border border-primary/25",
          style: {
            background: "linear-gradient(135deg, oklch(0.12 0.05 200 / 0.9), oklch(0.1 0.04 280 / 0.85))"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "break-words min-w-0 text-sm leading-relaxed",
                style: { color: LIME },
                children: message.content
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/50 mt-1.5 block font-mono text-right", children: timeStr })
          ]
        }
      )
    }
  );
}
function ThinkingDots({ isStreaming }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -6 },
      className: "flex justify-start mb-4",
      "data-ocid": "chat.thinking_indicator",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel border-primary/20 rounded-2xl px-4 py-3 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary/60 tracking-widest mr-1", children: "PRIYA" }),
        ["a", "b", "c"].map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "w-2 h-2 rounded-full bg-primary",
            animate: { opacity: [0.3, 1, 0.3], scaleY: [0.7, 1.3, 0.7] },
            transition: {
              duration: 0.7,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.18
            }
          },
          id
        )),
        isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary/50 ml-2 tracking-widest", children: "STREAMING" })
      ] })
    }
  );
}
function AgentPipeline({ stepIndex }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 8 },
      className: "px-3 py-2 glass-panel border-primary/15 rounded-xl text-[10px] font-mono",
      "data-ocid": "chat.agent_pipeline",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 mr-1", children: "Agents:" }),
        AGENT_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `flex items-center gap-1 transition-colors duration-300 ${i === stepIndex ? "text-primary font-bold" : i < stepIndex ? "text-muted-foreground/40 line-through" : "text-muted-foreground/30"}`,
            children: [
              i === stepIndex && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  className: "w-1.5 h-1.5 rounded-full bg-primary inline-block",
                  animate: { opacity: [1, 0.3, 1] },
                  transition: { duration: 0.6, repeat: Number.POSITIVE_INFINITY }
                }
              ),
              step,
              i < AGENT_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/25 mx-0.5", children: "→" })
            ]
          },
          step
        ))
      ] })
    }
  );
}
function LangPills({
  current,
  onChange
}) {
  const langs = ["english", "hindi", "nagpuri"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", "data-ocid": "chat.language_selector", children: langs.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onChange(l),
      "data-ocid": `chat.lang_${l}_button`,
      className: `px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 ${current === l ? "bg-primary/20 border-primary/70 text-primary shadow-[0_0_8px_oklch(0.7_0.18_200_/_0.4)]" : "border-border/30 text-muted-foreground/50 hover:border-primary/40 hover:text-primary/70"}`,
      children: LANG_LABELS[l]
    },
    l
  )) });
}
function MicRing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        className: "absolute inset-0 rounded-xl border-2 border-[#39FF14]/60",
        animate: { scale: [1, 1.5], opacity: [0.6, 0] },
        transition: { duration: 1, repeat: Number.POSITIVE_INFINITY }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        className: "absolute inset-0 rounded-xl border border-[#39FF14]/30",
        animate: { scale: [1, 1.9], opacity: [0.4, 0] },
        transition: {
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.3
        }
      }
    )
  ] });
}
const STEP_ORDER = [
  "planner",
  "research",
  "executor",
  "memory",
  "critic"
];
const STEP_ICONS = {
  planner: "🧠",
  research: "🔍",
  executor: "⚡",
  memory: "💾",
  critic: "✅"
};
const STEP_LABELS = {
  planner: "Planner",
  research: "Research",
  executor: "Executor",
  memory: "Memory",
  critic: "Critic"
};
function elapsedMs(startedAt) {
  if (startedAt === BigInt(0)) return "";
  const ms = Date.now() - Number(startedAt / BigInt(1e6));
  if (ms < 1e3) return `${ms}ms`;
  return `${(ms / 1e3).toFixed(1)}s`;
}
function StepBadge({ step, index }) {
  const isRunning = step.status === "running";
  const isComplete = step.status === "complete";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.06 },
      className: `relative flex items-start gap-2.5 p-2.5 rounded-xl border transition-all duration-300 ${isRunning ? "border-primary/60 bg-primary/5 shadow-[0_0_12px_oklch(0.7_0.18_200/0.2)]" : isComplete ? "border-emerald-400/40 bg-emerald-400/5" : "border-border/15 bg-transparent opacity-40"}`,
      "data-ocid": `chat.pipeline_step.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] ${isRunning ? "border-primary/70 bg-primary/10" : isComplete ? "border-emerald-400/60 bg-emerald-400/10" : "border-border/30 bg-transparent"}`,
            children: isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 text-primary animate-spin" }) : isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: STEP_ICONS[step.agentType] ?? "·" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1 mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-mono font-bold tracking-wider ${isRunning ? "text-primary" : isComplete ? "text-emerald-400" : "text-muted-foreground/40"}`,
                children: STEP_LABELS[step.agentType] ?? step.agentType
              }
            ),
            (isRunning || isComplete) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-muted-foreground/40 flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
              elapsedMs(step.startedAt)
            ] })
          ] }),
          isComplete && step.output && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground/70 line-clamp-2 leading-relaxed", children: [
            step.output.slice(0, 60),
            step.output.length > 60 ? "…" : ""
          ] }),
          isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-primary/50 tracking-widest", children: "Processing…" })
        ] }),
        isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 rounded-xl border border-primary/30 pointer-events-none",
            animate: { opacity: [0.5, 0] },
            transition: { duration: 1.2, repeat: Number.POSITIVE_INFINITY }
          }
        )
      ]
    }
  );
}
function PipelineSidebar({
  steps,
  isOpen,
  onToggle
}) {
  const orderedSteps = STEP_ORDER.map((type) => {
    const found = steps.find((s) => s.agentType === type);
    return found ?? {
      agentType: type,
      status: "pending",
      output: "",
      startedAt: BigInt(0),
      completedAt: BigInt(0)
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: false,
      animate: { width: isOpen ? 220 : 36 },
      transition: { duration: 0.25, ease: "easeInOut" },
      className: "relative flex-shrink-0 border-l border-border/20 bg-card/40 backdrop-blur-sm overflow-hidden",
      "data-ocid": "chat.pipeline_sidebar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "absolute top-3 left-0 w-9 h-9 flex items-center justify-center z-10 text-primary/60 hover:text-primary transition-colors",
            "aria-label": isOpen ? "Collapse pipeline feed" : "Expand pipeline feed",
            "data-ocid": "chat.pipeline_toggle",
            children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.15 },
            className: "absolute inset-0 pl-9 pr-2 pt-2 pb-3 flex flex-col gap-1.5 overflow-y-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-primary",
                    animate: { opacity: [1, 0.3, 1] },
                    transition: { duration: 1, repeat: Number.POSITIVE_INFINITY }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-primary/70 tracking-widest uppercase", children: "Live Pipeline" })
              ] }),
              orderedSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StepBadge, { step, index: i }, step.agentType)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute left-[calc(9px+14px)] top-[52px] w-px pointer-events-none",
                  style: {
                    height: `${orderedSteps.length * 52}px`,
                    background: "linear-gradient(to bottom, oklch(0.7 0.18 200 / 0.2), transparent)"
                  }
                }
              )
            ]
          }
        ) }),
        !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-12 left-0 w-9 flex flex-col items-center gap-2", children: orderedSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            title: STEP_LABELS[step.agentType],
            className: `w-2 h-2 rounded-full border transition-colors ${step.status === "running" ? "bg-primary border-primary/60 animate-pulse" : step.status === "complete" ? "bg-emerald-400 border-emerald-400/60" : "bg-transparent border-border/30"}`,
            "data-ocid": `chat.pipeline_dot.${i + 1}`
          },
          step.agentType
        )) })
      ]
    }
  );
}
function ChatPage() {
  const { data: rawMessages = [], isLoading } = useGetHistory();
  const sendMessage = useSendMessage();
  const clearHistory = useClearHistory();
  const createChain = useCreateChain();
  const runChain = useRunChain();
  const { data: activeStream, isStreaming, hasFinalChunk } = useActiveStream();
  const {
    inputValue,
    setInputValue,
    isVoiceListening,
    setIsVoiceListening,
    isSpeaking,
    setIsSpeaking,
    setAvatarMood,
    language,
    setLanguage,
    voiceSettings,
    activeAgentChain,
    setActiveAgentChain,
    isThinking,
    setIsThinking,
    recordGeneticInteraction
  } = useAriaStore();
  const bottomRef = reactExports.useRef(null);
  const stopRecognitionRef = reactExports.useRef(null);
  const idleTimerRef = reactExports.useRef(null);
  const [showClear, setShowClear] = reactExports.useState(false);
  const [agentStep, setAgentStep] = reactExports.useState(0);
  const [pipelineOpen, setPipelineOpen] = reactExports.useState(false);
  const userMessages = rawMessages.filter((m) => m.role === "user");
  const scrollToBottom = reactExports.useCallback(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, []);
  const resetIdle = reactExports.useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setAvatarMood("idle"), 5e3);
  }, [setAvatarMood]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        stopSpeaking();
        setIsSpeaking(false);
        if (stopRecognitionRef.current) {
          stopRecognitionRef.current();
          stopRecognitionRef.current = null;
          setIsVoiceListening(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setIsSpeaking, setIsVoiceListening]);
  reactExports.useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (stopRecognitionRef.current) stopRecognitionRef.current();
    };
  }, []);
  reactExports.useEffect(() => {
    if (!activeAgentChain) {
      setAgentStep(0);
      return;
    }
    setAgentStep(0);
    const interval = setInterval(() => {
      setAgentStep((s) => {
        if (s >= AGENT_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => setActiveAgentChain(null), 800);
          return s;
        }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [activeAgentChain, setActiveAgentChain]);
  reactExports.useEffect(() => {
    if (isStreaming && !hasFinalChunk) {
      setPipelineOpen(true);
    }
  }, [isStreaming, hasFinalChunk]);
  const toggleMic = () => {
    var _a;
    if (isVoiceListening) {
      (_a = stopRecognitionRef.current) == null ? void 0 : _a.call(stopRecognitionRef);
      stopRecognitionRef.current = null;
      setIsVoiceListening(false);
      return;
    }
    setIsVoiceListening(true);
    const stop = startSpeechRecognition(
      language,
      (transcript, isFinal) => {
        setInputValue(transcript);
        if (isFinal) {
          setIsVoiceListening(false);
          stopRecognitionRef.current = null;
        }
      },
      () => setIsVoiceListening(false)
    );
    stopRecognitionRef.current = stop;
  };
  const handleSend = async () => {
    var _a;
    const trimmed = inputValue.trim();
    if (!trimmed || sendMessage.isPending) return;
    if (isVoiceListening) {
      (_a = stopRecognitionRef.current) == null ? void 0 : _a.call(stopRecognitionRef);
      stopRecognitionRef.current = null;
      setIsVoiceListening(false);
    }
    setInputValue("");
    setAvatarMood("thinking");
    setIsThinking(true);
    const topicWords = trimmed.split(/\s+/).slice(0, 3).join(" ");
    recordGeneticInteraction(topicWords, language);
    try {
      const chainId = await createChain.mutateAsync({ goal: trimmed });
      const fakeChain = {
        id: chainId,
        goal: trimmed,
        status: "running",
        currentStep: BigInt(0),
        tasks: []
      };
      setActiveAgentChain(fakeChain);
      void runChain.mutateAsync({ chainId });
    } catch {
    }
    sendMessage.mutate(trimmed, {
      onSuccess: (assistantMsg) => {
        const responseText = (assistantMsg == null ? void 0 : assistantMsg.content) ?? "";
        setIsThinking(false);
        const mood = detectHappy(trimmed) || detectHappy(responseText) ? "happy" : "speaking";
        setAvatarMood(mood);
        resetIdle();
        scrollToBottom();
        const langCode = LANG_CODES[language];
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(responseText);
          utter.lang = langCode;
          utter.rate = voiceSettings.speed ?? 0.95;
          utter.pitch = voiceSettings.pitch ?? 1.15;
          utter.volume = 1;
          const pickVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            return voices.find((v) => v.lang === langCode && !v.localService) || voices.find((v) => v.lang.startsWith(langCode.split("-")[0])) || voices.find(
              (v) => v.lang.startsWith("en") && /female|woman|zira|samantha|victoria/i.test(v.name)
            ) || voices.find((v) => v.lang.startsWith("en")) || null;
          };
          const voice = pickVoice();
          if (voice) utter.voice = voice;
          let resumeInterval = null;
          utter.onstart = () => {
            setIsThinking(false);
            setIsSpeaking(true);
            resumeInterval = setInterval(() => {
              if (window.speechSynthesis.paused)
                window.speechSynthesis.resume();
            }, 14e3);
          };
          utter.onend = () => {
            if (resumeInterval) clearInterval(resumeInterval);
            setTimeout(() => {
              setIsSpeaking(false);
              setAvatarMood("idle");
            }, 600);
          };
          utter.onerror = () => {
            if (resumeInterval) clearInterval(resumeInterval);
            setIsSpeaking(false);
            setAvatarMood("idle");
          };
          if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.addEventListener(
              "voiceschanged",
              () => {
                const v = pickVoice();
                if (v) utter.voice = v;
                window.speechSynthesis.speak(utter);
              },
              { once: true }
            );
          } else {
            window.speechSynthesis.speak(utter);
          }
        } else {
          void speakText(
            responseText,
            () => setIsSpeaking(true),
            () => {
              setIsSpeaking(false);
              setAvatarMood("idle");
            }
          );
        }
      },
      onError: () => {
        setIsThinking(false);
        setAvatarMood("alert");
        resetIdle();
      }
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };
  const pipelineSteps = (activeStream == null ? void 0 : activeStream.agentSteps) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-4rem)] relative",
      "data-ocid": "chat-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 z-10",
            style: {
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.06) 2px, oklch(0 0 0 / 0.06) 4px)"
            },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:w-[30%] xl:w-[28%] flex-shrink-0 border-r border-border/20 flex flex-col items-center justify-center bg-background/60 relative gap-4 py-6 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isSpeaking && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.9 },
                className: "absolute inset-0 rounded-full pointer-events-none",
                style: {
                  boxShadow: "0 0 48px 16px oklch(0.7 0.18 200 / 0.35), 0 0 80px 32px oklch(0.7 0.18 200 / 0.15)"
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: isSpeaking ? { scale: [1, 1.015, 1, 1.012, 1] } : { scale: 1 },
                transition: {
                  duration: 1.4,
                  repeat: isSpeaking ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PriyaAvatar, { height: 380 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isSpeaking ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              className: "flex items-center gap-2 justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    className: "w-2 h-2 rounded-full bg-primary",
                    animate: { opacity: [1, 0.3, 1] },
                    transition: {
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-primary tracking-widest uppercase", children: "Speaking" })
              ]
            },
            "speaking"
          ) : isVoiceListening ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              className: "flex items-center gap-2 justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    className: "w-2 h-2 rounded-full",
                    style: { background: LIME },
                    animate: { opacity: [1, 0.3, 1] },
                    transition: {
                      duration: 0.6,
                      repeat: Number.POSITIVE_INFINITY
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] font-mono tracking-widest uppercase",
                    style: { color: LIME },
                    children: "Listening"
                  }
                )
              ]
            },
            "listening"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "text-[11px] font-mono text-muted-foreground/40 tracking-widest uppercase",
              children: "Idle"
            },
            "idle"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: activeAgentChain && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgentPipeline, { stepIndex: agentStep }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex min-w-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-4 py-2.5 border-b border-border/20 glass-panel flex-shrink-0",
                "data-ocid": "chat.header",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-primary/70 tracking-widest uppercase", children: "PRIYA CHAT" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary/60" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/50", children: "Audio-only responses" }),
                    isStreaming && !hasFinalChunk && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.span,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        className: "text-[10px] font-mono text-primary tracking-widest flex items-center gap-1",
                        "data-ocid": "chat.streaming_badge",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.span,
                            {
                              className: "w-1.5 h-1.5 rounded-full bg-primary inline-block",
                              animate: { opacity: [1, 0.3, 1] },
                              transition: {
                                duration: 0.5,
                                repeat: Number.POSITIVE_INFINITY
                              }
                            }
                          ),
                          "LIVE"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LangPills, { current: language, onChange: setLanguage }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPipelineOpen((p) => !p),
                        className: `text-[10px] font-mono flex items-center gap-1 px-2 py-1 rounded-lg border transition-all duration-200 ${pipelineOpen ? "border-primary/50 text-primary bg-primary/10" : "border-border/30 text-muted-foreground/50 hover:border-primary/40 hover:text-primary/70"}`,
                        "data-ocid": "chat.pipeline_open_modal_button",
                        "aria-label": "Toggle pipeline feed",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pipeline" }),
                          isStreaming && !hasFinalChunk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowClear(true),
                        className: "text-[10px] text-muted-foreground/40 hover:text-destructive transition-colors flex items-center gap-1 font-mono",
                        "data-ocid": "chat.clear_trigger",
                        "aria-label": "Clear history",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScrollArea,
              {
                className: "flex-1 px-5 pt-4",
                "data-ocid": "chat.message_list",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 p-4", children: ["s1", "s2", "s3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Skeleton,
                  {
                    className: "h-12 w-3/4 ml-auto rounded-2xl"
                  },
                  id
                )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
                  userMessages.length === 0 && !sendMessage.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      className: "flex justify-center mt-8 mb-8",
                      "data-ocid": "chat.empty_state",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel border-primary/20 rounded-2xl px-6 py-5 max-w-sm text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-10 h-10 rounded-full border border-primary/60 flex items-center justify-center mx-auto mb-3",
                            style: {
                              boxShadow: "0 0 12px oklch(0.7 0.18 200 / 0.4)"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary font-mono", children: "P" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-mono leading-relaxed", children: [
                          "I'm",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "Priya" }),
                          ".",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          "Type or speak — I'll reply in voice."
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/40 mt-2 font-mono", children: "ESC stops speech · Shift+Enter = newline" })
                      ] })
                    }
                  ),
                  userMessages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserBubble, { message: msg, index: i }, String(msg.id))),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isThinking && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 8 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -8 },
                      transition: { duration: 0.3 },
                      className: "my-3 px-1",
                      "data-ocid": "chat.quantum_brain",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuantumBrain, { isVisible: isThinking })
                    },
                    "quantum-brain"
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
                    sendMessage.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ThinkingDots,
                      {
                        isStreaming: isStreaming && !hasFinalChunk
                      },
                      "thinking"
                    ),
                    isSpeaking && !sendMessage.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(SpeakingWaveform, {}, "waveform")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "border-t border-border/20 p-4 glass-panel flex-shrink-0",
                "data-ocid": "chat.input_area",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative min-w-0", children: [
                      isVoiceListening && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          className: "absolute -top-7 left-0 text-[10px] font-mono tracking-widest flex items-center gap-1",
                          style: { color: LIME },
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.span,
                              {
                                className: "w-1.5 h-1.5 rounded-full inline-block",
                                style: { background: LIME },
                                animate: { opacity: [1, 0.3, 1] },
                                transition: {
                                  duration: 0.5,
                                  repeat: Number.POSITIVE_INFINITY
                                }
                              }
                            ),
                            "LISTENING..."
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          value: inputValue,
                          onChange: (e) => setInputValue(e.target.value),
                          onKeyDown: handleKeyDown,
                          placeholder: isVoiceListening ? "Listening…" : "Message Priya…",
                          className: "min-h-[48px] max-h-[120px] resize-none bg-card/60 border-border/40 focus:border-primary/60 font-mono text-sm placeholder:text-muted-foreground/30 pr-4 rounded-xl transition-colors",
                          style: { color: LIME, caretColor: LIME },
                          "data-ocid": "chat.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => void handleSend(),
                          disabled: !inputValue.trim() || sendMessage.isPending,
                          className: "w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-primary/15 border-primary/50 text-primary hover:bg-primary/25 hover:shadow-[0_0_10px_oklch(0.7_0.18_200_/_0.4)]",
                          "data-ocid": "chat.send_button",
                          "aria-label": "Send message",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        isVoiceListening && /* @__PURE__ */ jsxRuntimeExports.jsx(MicRing, {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: toggleMic,
                            className: `relative w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 z-10 ${isVoiceListening ? "border-[#39FF14]/70 bg-[#39FF14]/10 text-[#39FF14]" : "border-border/40 hover:border-primary/50 text-muted-foreground hover:text-primary"}`,
                            "data-ocid": "chat.mic_button",
                            "aria-label": isVoiceListening ? "Stop recording" : "Start voice input",
                            children: isVoiceListening ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2 px-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/40 font-mono", children: "Enter → send · Shift+Enter → newline · ESC → stop voice" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border",
                        style: language === "english" ? {
                          color: "oklch(0.7 0.18 200)",
                          borderColor: "oklch(0.7 0.18 200 / 0.3)"
                        } : { color: LIME, borderColor: `${LIME}44` },
                        "data-ocid": "chat.current_lang_badge",
                        children: LANG_LABELS[language]
                      }
                    )
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PipelineSidebar,
            {
              steps: pipelineSteps,
              isOpen: pipelineOpen,
              onToggle: () => setPipelineOpen((p) => !p)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showClear && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
            onClick: () => setShowClear(false),
            "data-ocid": "chat.clear_dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { scale: 0.9, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.9, opacity: 0 },
                className: "glass-panel border-primary/20 rounded-2xl p-6 max-w-sm w-full mx-4",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-2", children: "Clear History?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Priya will lose all conversation context for this session." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "flex-1 py-2.5 rounded-xl border border-border/40 text-sm font-mono hover:border-primary/40 transition-colors",
                        onClick: () => setShowClear(false),
                        "data-ocid": "chat.clear_cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "flex-1 py-2.5 rounded-xl border border-destructive/50 bg-destructive/15 text-destructive text-sm font-mono hover:bg-destructive/25 transition-colors",
                        onClick: () => {
                          clearHistory.mutate();
                          setShowClear(false);
                        },
                        "data-ocid": "chat.clear_confirm_button",
                        children: "Clear All"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ) })
      ]
    }
  );
}
export {
  ChatPage
};
