
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Square.svelte generated by Svelte v3.55.1 */

    const { console: console_1 } = globals;
    const file_1 = "src/Square.svelte";

    function create_fragment$3(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let div_id_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(/*file*/ ctx[1]);
    			t1 = text(/*rank*/ ctx[0]);
    			attr_dev(div, "id", div_id_value = "" + (/*file*/ ctx[1] + /*rank*/ ctx[0]));

    			attr_dev(div, "class", "" + (null_to_empty(/*backgroundColour*/ ctx[2] === "black"
    			? "black square"
    			: "white square") + " svelte-1iwnem7"));

    			attr_dev(div, "ondragover", "return false");
    			add_location(div, file_1, 26, 0, 569);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "dragenter", /*handleDragEnter*/ ctx[3], false, false, false),
    					listen_dev(div, "dragleave", /*handleDragLeave*/ ctx[4], false, false, false),
    					listen_dev(div, "drop", /*handleDragDrop*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*file*/ 2) set_data_dev(t0, /*file*/ ctx[1]);
    			if (dirty & /*rank*/ 1) set_data_dev(t1, /*rank*/ ctx[0]);

    			if (dirty & /*file, rank*/ 3 && div_id_value !== (div_id_value = "" + (/*file*/ ctx[1] + /*rank*/ ctx[0]))) {
    				attr_dev(div, "id", div_id_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Square', slots, []);
    	let { rank } = $$props;
    	let { file } = $$props;
    	const squareId = `${file}${rank}`;
    	const backgroundColour = (["a", "c", "e", "g"].includes(file) && rank % 2 !== 0 || ["b", "d", "f", "h"].includes(file) && rank % 2 === 0) && "black" || "white";

    	const handleDragEnter = e => {
    		console.log(`Entered Square ${squareId}`);
    	};

    	const handleDragLeave = e => {
    		console.log(`Leaving Square ${squareId}`);
    	};

    	const handleDragDrop = e => {
    		e.preventDefault();
    		console.log(`Dropped in ${squareId}`);
    	};

    	$$self.$$.on_mount.push(function () {
    		if (rank === undefined && !('rank' in $$props || $$self.$$.bound[$$self.$$.props['rank']])) {
    			console_1.warn("<Square> was created without expected prop 'rank'");
    		}

    		if (file === undefined && !('file' in $$props || $$self.$$.bound[$$self.$$.props['file']])) {
    			console_1.warn("<Square> was created without expected prop 'file'");
    		}
    	});

    	const writable_props = ['rank', 'file'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Square> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('rank' in $$props) $$invalidate(0, rank = $$props.rank);
    		if ('file' in $$props) $$invalidate(1, file = $$props.file);
    	};

    	$$self.$capture_state = () => ({
    		rank,
    		file,
    		squareId,
    		backgroundColour,
    		handleDragEnter,
    		handleDragLeave,
    		handleDragDrop
    	});

    	$$self.$inject_state = $$props => {
    		if ('rank' in $$props) $$invalidate(0, rank = $$props.rank);
    		if ('file' in $$props) $$invalidate(1, file = $$props.file);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rank, file, backgroundColour, handleDragEnter, handleDragLeave, handleDragDrop];
    }

    class Square extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { rank: 0, file: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Square",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get rank() {
    		throw new Error("<Square>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rank(value) {
    		throw new Error("<Square>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get file() {
    		throw new Error("<Square>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set file(value) {
    		throw new Error("<Square>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Row.svelte generated by Svelte v3.55.1 */
    const file$2 = "src/Row.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let square0;
    	let t0;
    	let square1;
    	let t1;
    	let square2;
    	let t2;
    	let square3;
    	let t3;
    	let square4;
    	let t4;
    	let square5;
    	let t5;
    	let square6;
    	let t6;
    	let square7;
    	let current;

    	square0 = new Square({
    			props: { rank: /*rank*/ ctx[0], file: "a" },
    			$$inline: true
    		});

    	square1 = new Square({
    			props: { rank: /*rank*/ ctx[0], file: "b" },
    			$$inline: true
    		});

    	square2 = new Square({
    			props: { rank: /*rank*/ ctx[0], file: "c" },
    			$$inline: true
    		});

    	square3 = new Square({
    			props: { rank: /*rank*/ ctx[0], file: "d" },
    			$$inline: true
    		});

    	square4 = new Square({
    			props: { rank: /*rank*/ ctx[0], file: "e" },
    			$$inline: true
    		});

    	square5 = new Square({
    			props: { rank: /*rank*/ ctx[0], file: "f" },
    			$$inline: true
    		});

    	square6 = new Square({
    			props: { rank: /*rank*/ ctx[0], file: "g" },
    			$$inline: true
    		});

    	square7 = new Square({
    			props: { rank: /*rank*/ ctx[0], file: "h" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(square0.$$.fragment);
    			t0 = space();
    			create_component(square1.$$.fragment);
    			t1 = space();
    			create_component(square2.$$.fragment);
    			t2 = space();
    			create_component(square3.$$.fragment);
    			t3 = space();
    			create_component(square4.$$.fragment);
    			t4 = space();
    			create_component(square5.$$.fragment);
    			t5 = space();
    			create_component(square6.$$.fragment);
    			t6 = space();
    			create_component(square7.$$.fragment);
    			attr_dev(div, "class", "row svelte-8yvmn9");
    			add_location(div, file$2, 5, 0, 79);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(square0, div, null);
    			append_dev(div, t0);
    			mount_component(square1, div, null);
    			append_dev(div, t1);
    			mount_component(square2, div, null);
    			append_dev(div, t2);
    			mount_component(square3, div, null);
    			append_dev(div, t3);
    			mount_component(square4, div, null);
    			append_dev(div, t4);
    			mount_component(square5, div, null);
    			append_dev(div, t5);
    			mount_component(square6, div, null);
    			append_dev(div, t6);
    			mount_component(square7, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const square0_changes = {};
    			if (dirty & /*rank*/ 1) square0_changes.rank = /*rank*/ ctx[0];
    			square0.$set(square0_changes);
    			const square1_changes = {};
    			if (dirty & /*rank*/ 1) square1_changes.rank = /*rank*/ ctx[0];
    			square1.$set(square1_changes);
    			const square2_changes = {};
    			if (dirty & /*rank*/ 1) square2_changes.rank = /*rank*/ ctx[0];
    			square2.$set(square2_changes);
    			const square3_changes = {};
    			if (dirty & /*rank*/ 1) square3_changes.rank = /*rank*/ ctx[0];
    			square3.$set(square3_changes);
    			const square4_changes = {};
    			if (dirty & /*rank*/ 1) square4_changes.rank = /*rank*/ ctx[0];
    			square4.$set(square4_changes);
    			const square5_changes = {};
    			if (dirty & /*rank*/ 1) square5_changes.rank = /*rank*/ ctx[0];
    			square5.$set(square5_changes);
    			const square6_changes = {};
    			if (dirty & /*rank*/ 1) square6_changes.rank = /*rank*/ ctx[0];
    			square6.$set(square6_changes);
    			const square7_changes = {};
    			if (dirty & /*rank*/ 1) square7_changes.rank = /*rank*/ ctx[0];
    			square7.$set(square7_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(square0.$$.fragment, local);
    			transition_in(square1.$$.fragment, local);
    			transition_in(square2.$$.fragment, local);
    			transition_in(square3.$$.fragment, local);
    			transition_in(square4.$$.fragment, local);
    			transition_in(square5.$$.fragment, local);
    			transition_in(square6.$$.fragment, local);
    			transition_in(square7.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(square0.$$.fragment, local);
    			transition_out(square1.$$.fragment, local);
    			transition_out(square2.$$.fragment, local);
    			transition_out(square3.$$.fragment, local);
    			transition_out(square4.$$.fragment, local);
    			transition_out(square5.$$.fragment, local);
    			transition_out(square6.$$.fragment, local);
    			transition_out(square7.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(square0);
    			destroy_component(square1);
    			destroy_component(square2);
    			destroy_component(square3);
    			destroy_component(square4);
    			destroy_component(square5);
    			destroy_component(square6);
    			destroy_component(square7);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Row', slots, []);
    	let { rank } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (rank === undefined && !('rank' in $$props || $$self.$$.bound[$$self.$$.props['rank']])) {
    			console.warn("<Row> was created without expected prop 'rank'");
    		}
    	});

    	const writable_props = ['rank'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Row> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('rank' in $$props) $$invalidate(0, rank = $$props.rank);
    	};

    	$$self.$capture_state = () => ({ Square, rank });

    	$$self.$inject_state = $$props => {
    		if ('rank' in $$props) $$invalidate(0, rank = $$props.rank);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [rank];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { rank: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get rank() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rank(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Board.svelte generated by Svelte v3.55.1 */
    const file$1 = "src/Board.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let row0;
    	let t0;
    	let row1;
    	let t1;
    	let row2;
    	let t2;
    	let row3;
    	let t3;
    	let row4;
    	let t4;
    	let row5;
    	let t5;
    	let row6;
    	let t6;
    	let row7;
    	let current;
    	row0 = new Row({ props: { rank: "1" }, $$inline: true });
    	row1 = new Row({ props: { rank: "2" }, $$inline: true });
    	row2 = new Row({ props: { rank: "3" }, $$inline: true });
    	row3 = new Row({ props: { rank: "4" }, $$inline: true });
    	row4 = new Row({ props: { rank: "5" }, $$inline: true });
    	row5 = new Row({ props: { rank: "6" }, $$inline: true });
    	row6 = new Row({ props: { rank: "7" }, $$inline: true });
    	row7 = new Row({ props: { rank: "8" }, $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(row0.$$.fragment);
    			t0 = space();
    			create_component(row1.$$.fragment);
    			t1 = space();
    			create_component(row2.$$.fragment);
    			t2 = space();
    			create_component(row3.$$.fragment);
    			t3 = space();
    			create_component(row4.$$.fragment);
    			t4 = space();
    			create_component(row5.$$.fragment);
    			t5 = space();
    			create_component(row6.$$.fragment);
    			t6 = space();
    			create_component(row7.$$.fragment);
    			attr_dev(div, "class", "board svelte-v5nq46");
    			add_location(div, file$1, 4, 0, 54);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(row0, div, null);
    			append_dev(div, t0);
    			mount_component(row1, div, null);
    			append_dev(div, t1);
    			mount_component(row2, div, null);
    			append_dev(div, t2);
    			mount_component(row3, div, null);
    			append_dev(div, t3);
    			mount_component(row4, div, null);
    			append_dev(div, t4);
    			mount_component(row5, div, null);
    			append_dev(div, t5);
    			mount_component(row6, div, null);
    			append_dev(div, t6);
    			mount_component(row7, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			transition_in(row2.$$.fragment, local);
    			transition_in(row3.$$.fragment, local);
    			transition_in(row4.$$.fragment, local);
    			transition_in(row5.$$.fragment, local);
    			transition_in(row6.$$.fragment, local);
    			transition_in(row7.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			transition_out(row2.$$.fragment, local);
    			transition_out(row3.$$.fragment, local);
    			transition_out(row4.$$.fragment, local);
    			transition_out(row5.$$.fragment, local);
    			transition_out(row6.$$.fragment, local);
    			transition_out(row7.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(row0);
    			destroy_component(row1);
    			destroy_component(row2);
    			destroy_component(row3);
    			destroy_component(row4);
    			destroy_component(row5);
    			destroy_component(row6);
    			destroy_component(row7);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Board', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Board> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Row });
    	return [];
    }

    class Board extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Board",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const onDrag = (e) => {

    };

    const onDrop = (e) => {
        console.log('Dropped');
        console.log(e);
    };

    /* src/App.svelte generated by Svelte v3.55.1 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let board;
    	let t;
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	board = new Board({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(board.$$.fragment);
    			t = space();
    			div = element("div");
    			attr_dev(div, "draggable", "true");
    			attr_dev(div, "class", "test-piece svelte-ye3sa8");
    			add_location(div, file, 6, 2, 132);
    			add_location(main, file, 4, 0, 111);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(board, main, null);
    			append_dev(main, t);
    			append_dev(main, div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "drag", onDrag, false, false, false),
    					listen_dev(div, "drop", onDrop, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(board.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(board.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(board);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Board, onDrag, onDrop });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            name: 'world'
        }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
