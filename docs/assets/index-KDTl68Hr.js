(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(o){if(o.ep)return;o.ep=!0;const l=i(o);fetch(o.href,l)}})();let f;const v=new Uint8Array(16);function S(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(v)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function E(e,t=0){return r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]}const C=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:C};function A(e,t,i){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const a=e.random||(e.rng||S)();return a[6]=a[6]&15|64,a[8]=a[8]&63|128,E(a)}class b{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"completed",Pending:"pending"},s={todos:[new b("Learn JavaScript"),new b("Learn TypeScript"),new b("Learn Angular")],filter:c.All},P=()=>{T(),console.log("initStore 😎")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(s))},D=(e=c.All)=>{switch(e){case c.All:return[...s.todos];case c.Completed:return s.todos.filter(t=>t.done);case c.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},k=e=>{if(!e)throw new Error("Description is required");const t=new b(e);s.todos.push(t),g()},I=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g(),console.log(s)},U=e=>{s.todos=s.todos.filter(t=>t.id!==e),g()},x=()=>{console.log(s.todos),s.todos=s.todos.filter(e=>!e.done),g()},O=(e=c.All)=>{s.filter=e,g()},q=()=>s.filter,d={addTodo:k,deleteCompleted:x,deleteTodo:U,getCurrentFilter:q,initStore:P,getTodos:D,loadStore:T,setFilter:O,toggleTodo:I},F=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
\r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a id="completao" class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">Kuro</a></p>\r
\r
</footer>`,M=e=>{if(!e)throw new Error("A TODO object is required");const t=` 
                <div class="view">
                    <input class="toggle" type="checkbox" ${e.done?"checked":""}>
                    <label>${e.description}</label>
                    <button class="destroy"></button>   
                </div>
                <input class="edit" value="Create a TodoMVC template">`,i=document.createElement("li");return i.innerHTML=t,i.setAttribute("data-id",e.id),e.done&&i.classList.add("completed"),i};let y;const H=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=d.getTodos(c.Pending).length};let h;const N=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(i=>{h.append(M(i))})},m={TodoList:".todo-list",NewTodoInput:"#new-todo-input",DeleteDone:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const n=d.getTodos(d.getCurrentFilter());N(m.TodoList,n),i()},i=()=>{H(m.PendingCountLabel)};(()=>{const n=document.createElement("div");n.innerHTML=F,document.querySelector(e).appendChild(n),t()})();const a=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),l=document.querySelector(m.DeleteDone),u=document.querySelectorAll(m.TodoFilters);a.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().length!==0&&(d.addTodo(n.target.value),n.target.value="",t())}),o.addEventListener("click",n=>{const p=n.target.closest("[data-id]");d.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",n=>{if(!n.target.classList.contains("destroy"))return;const p=n.target.parentElement.parentElement.getAttribute("data-id");d.deleteTodo(p),t()}),l.addEventListener("click",n=>{d.deleteCompleted(),t()}),u.forEach(n=>{n.addEventListener("click",p=>{switch(u.forEach(L=>L.classList.remove("selected")),p.target.classList.add("selected"),p.target.textContent){case"Todos":d.setFilter(c.All);break;case"Pendientes":d.setFilter(c.Pending);break;case"Completados":d.setFilter(c.Completed);break}t()})})};d.initStore();R("#app");
