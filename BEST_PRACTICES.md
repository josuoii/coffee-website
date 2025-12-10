# React Performance Best Practices - Quick Reference

## 🎯 When to Optimize

### Use `useMemo` when:
- ✅ Filtering/mapping large arrays
- ✅ Complex calculations
- ✅ Creating objects/arrays passed as props
- ❌ Simple arithmetic (a + b)
- ❌ Primitive values

### Use `useCallback` when:
- ✅ Functions passed to child components
- ✅ Functions in dependency arrays
- ✅ Event handlers in optimized components
- ❌ Functions only used internally
- ❌ One-time event handlers

### Use `React.memo` when:
- ✅ Pure functional components
- ✅ Components that render often
- ✅ Components with expensive renders
- ❌ Components that always change
- ❌ Simple components

---

## 📊 Performance Patterns

### 1. Memoized Filtering
```typescript
const filteredItems = useMemo(() => {
    return items.filter(item => item.category === selectedCategory);
}, [items, selectedCategory]);
```

### 2. Debounced Input
```typescript
const [input, setInput] = useState('');
const [debouncedInput, setDebouncedInput] = useState('');

useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(input), 300);
    return () => clearTimeout(timer);
}, [input]);
```

### 3. Stable Event Handlers
```typescript
const handleClick = useCallback((id: string) => {
    doSomething(id);
}, [dependency]);
```

### 4. Memoized Context Value
```typescript
const value = useMemo(() => ({
    state,
    actions: { action1, action2 }
}), [state, action1, action2]);

return <Context.Provider value={value}>{children}</Context.Provider>;
```

---

## 🚫 Common Mistakes

### ❌ Creating objects in render
```typescript
// Bad
<Component style={{ margin: 10 }} />

// Good
const style = useMemo(() => ({ margin: 10 }), []);
<Component style={style} />
```

### ❌ Inline functions in loops
```typescript
// Bad
{items.map(item => (
    <Button onClick={() => handleClick(item.id)} />
))}

// Good
const handleClick = useCallback((id) => { ... }, []);
{items.map(item => (
    <Button onClick={() => handleClick(item.id)} />
))}
```

### ❌ Over-optimization
```typescript
// Bad - Unnecessary
const sum = useMemo(() => a + b, [a, b]);

// Good - Just use it
const sum = a + b;
```

---

## ✅ Code Review Checklist

- [ ] No unnecessary re-renders
- [ ] Expensive computations memoized
- [ ] Event handlers stable (useCallback)
- [ ] Context values memoized
- [ ] Large lists virtualized (if needed)
- [ ] Images lazy loaded
- [ ] Debounced search inputs
- [ ] No inline object/array creation
- [ ] TypeScript types complete
- [ ] Error boundaries in place

---

## 🔍 Debugging Performance

### React DevTools Profiler
1. Open React DevTools
2. Go to Profiler tab
3. Click record
4. Perform action
5. Stop recording
6. Analyze flame graph

### Console Timing
```typescript
console.time('operation');
// ... expensive operation
console.timeEnd('operation');
```

### Why Did You Render
```typescript
// Add to component
useWhyDidYouUpdate('ComponentName', props);
```

---

## 📚 Resources

- [React Docs - Performance](https://react.dev/learn/render-and-commit)
- [useMemo vs useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
- [React Performance](https://web.dev/react/)
