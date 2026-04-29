import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, Eye, EyeOff, Star, ShoppingCart, LogOut, Bell, Search, User, Menu as MenuIcon, Home, Plus, Copy, FileText, MapPin, Trash2, MessageSquare, AlertTriangle } from 'lucide-react';

export default function AppIdosos() {
  const [screen, setScreen] = useState('home');
  const [userData, setUserData] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const [appData, setAppData] = useState({ cartoesVirtuais: {}, pedidos: [], cartaoMobi: null, smsLidas: [], smsApagadas: [] });
  const [acessibilidade, setAcessibilidade] = useState({ tamanhoFonte: 1, modoEscuro: false, showMenuAcessibilidade: false });

  useEffect(() => {
    const saved = localStorage.getItem('appIdososV4');
    if (saved) {
      const data = JSON.parse(saved);
      setUserData(data.user);
      setAppData(data.appData || { cartoesVirtuais: {}, pedidos: [], cartaoMobi: null, smsLidas: [], smsApagadas: [] });
    }
    const savedAcess = localStorage.getItem('acessibilidadeIdosos');
    if (savedAcess) {
      setAcessibilidade(JSON.parse(savedAcess));
    }
  }, []);

  const mudarFonte = (delta) => {
    const novoTamanho = Math.max(0.8, Math.min(1.6, acessibilidade.tamanhoFonte + delta));
    const newAcess = { ...acessibilidade, tamanhoFonte: novoTamanho };
    setAcessibilidade(newAcess);
    localStorage.setItem('acessibilidadeIdosos', JSON.stringify(newAcess));
  };

  const toggleModoEscuro = () => {
    const newAcess = { ...acessibilidade, modoEscuro: !acessibilidade.modoEscuro };
    setAcessibilidade(newAcess);
    localStorage.setItem('acessibilidadeIdosos', JSON.stringify(newAcess));
  };

  const saveDados = (newUser, newAppData) => {
    setUserData(newUser);
    setAppData(newAppData);
    localStorage.setItem('appIdososV4', JSON.stringify({ user: newUser, appData: newAppData }));
  };

  const sairDaConta = () => {
    setSelectedBank(null);
    setScreen('home');
  };

  const bancos = {
    verde: { id: 'verde', nome: 'Banco Verde', cor: '#10b981', gradient: 'from-green-600 to-green-500', logo: '🌿', mascote: '🦜', mascoteNome: 'Pepê', saldo: 2547.72, senha: '1234' },
    marrom: { id: 'marrom', nome: 'Banco Marrom', cor: '#92400e', gradient: 'from-amber-800 to-amber-700', logo: '🏠', mascote: '🦅', mascoteNome: 'Águia', saldo: 3200.75, senha: '5678' },
    rosa: { id: 'rosa', nome: 'Banco Rosa', cor: '#be185d', gradient: 'from-pink-700 to-pink-600', logo: '✨', mascote: '🦋', mascoteNome: 'Borboleta', saldo: 1890.40, senha: '9999' }
  };

  // ==================== ACESSIBILIDADE ====================
  const MenuAcessibilidade = () => (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className={`${acessibilidade.modoEscuro ? 'bg-gray-900 text-white' : 'bg-white'} rounded-2xl p-6 max-w-sm shadow-2xl`}>
        <h2 className="text-2xl font-bold mb-6" style={{ fontSize: `${20 * acessibilidade.tamanhoFonte}px` }}>Acessibilidade</h2>
        
        <div className="space-y-6">
          {/* Tamanho da fonte */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-bold" style={{ fontSize: `${16 * acessibilidade.tamanhoFonte}px` }}>Tamanho da Fonte</label>
              <span style={{ fontSize: `${14 * acessibilidade.tamanhoFonte}px` }} className="text-slate-500">{Math.round(acessibilidade.tamanhoFonte * 100)}%</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => mudarFonte(-0.1)} className={`${acessibilidade.modoEscuro ? 'bg-gray-700 hover:bg-gray-600' : 'bg-slate-200 hover:bg-slate-300'} p-3 rounded-lg font-bold text-xl w-14 h-14`}>A-</button>
              <div className={`flex-1 h-2 rounded-full ${acessibilidade.modoEscuro ? 'bg-gray-700' : 'bg-slate-300'}`} style={{ background: `linear-gradient(90deg, ${acessibilidade.modoEscuro ? '#444' : '#cbd5e1'} 0%, #10b981 ${(acessibilidade.tamanhoFonte - 0.8) / 0.8 * 100}%, ${acessibilidade.modoEscuro ? '#444' : '#cbd5e1'} ${(acessibilidade.tamanhoFonte - 0.8) / 0.8 * 100}%, ${acessibilidade.modoEscuro ? '#444' : '#cbd5e1'} 100%)` }} />
              <button onClick={() => mudarFonte(0.1)} className={`${acessibilidade.modoEscuro ? 'bg-gray-700 hover:bg-gray-600' : 'bg-slate-200 hover:bg-slate-300'} p-3 rounded-lg font-bold text-2xl w-14 h-14`}>A+</button>
            </div>
          </div>

          {/* Modo Escuro */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-bold" style={{ fontSize: `${16 * acessibilidade.tamanhoFonte}px` }}>Modo Escuro</label>
            </div>
            <button onClick={toggleModoEscuro} className={`w-full p-4 rounded-xl font-bold text-lg transition ${acessibilidade.modoEscuro ? 'bg-green-600 text-white' : 'bg-slate-200'}`} style={{ fontSize: `${16 * acessibilidade.tamanhoFonte}px`, padding: `${16 * acessibilidade.tamanhoFonte}px` }}>
              {acessibilidade.modoEscuro ? '🌙 Ligado' : '☀️ Desligado'}
            </button>
          </div>

          {/* Info */}
          <div className={`p-4 rounded-xl ${acessibilidade.modoEscuro ? 'bg-gray-800 text-gray-300' : 'bg-blue-50 text-blue-900'}`}>
            <p style={{ fontSize: `${14 * acessibilidade.tamanhoFonte}px` }}>💡 As mudanças foram salvas automaticamente e funcionam em todo o app!</p>
          </div>

          {/* Fechar */}
          <button onClick={() => setAcessibilidade({ ...acessibilidade, showMenuAcessibilidade: false })} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl p-4" style={{ fontSize: `${16 * acessibilidade.tamanhoFonte}px`, padding: `${16 * acessibilidade.tamanhoFonte}px` }}>
            ✓ Fechar
          </button>
        </div>
      </div>
    </div>
  );

  // ==================== HOME ====================
  const TelaInicial = () => {
    if (!userData) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6">
          <div className="text-7xl mb-4 animate-bounce">📱</div>
          <h1 className="text-4xl font-bold text-white mb-2 text-center">Aprenda Digital</h1>
          <p className="text-lg text-slate-300 mb-8 text-center">Aprenda a usar apps com segurança</p>
          <button onClick={() => setScreen('cadastro')} className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:scale-105 transition">
            Começar Agora
          </button>
        </div>
      );
    }
    const semsNaoLidos = [1, 2, 3, 4, 5].filter(id => !appData.smsLidas.includes(id) && !appData.smsApagadas.includes(id)).length;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 pb-8">
        <div className="max-w-md mx-auto">
          <div className="pt-6 pb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Olá,</p>
              <h1 className="text-3xl font-bold text-slate-900">{userData.nome.split(' ')[0]}</h1>
            </div>
            <button onClick={() => { setUserData(null); localStorage.removeItem('appIdososV4'); }} className="p-3 hover:bg-slate-200 rounded-full">
              <LogOut size={24} className="text-slate-600" />
            </button>
          </div>
          <div className="space-y-3 mt-6">
            <MenuCard icon="🏦" title="Bancos" desc="PIX, transferências e cartões" gradient="from-green-400 to-green-600" onClick={() => setScreen('bancos')} />
            <MenuCard icon="🚗" title="Mobilidade Urbana" desc="Simule uma corrida" gradient="from-purple-400 to-purple-600" onClick={() => setScreen('mobilidade')} />
            <MenuCard icon="🛍️" title="Compra Fácil" desc="Compre online com segurança" gradient="from-blue-400 to-blue-600" onClick={() => setScreen('loja')} />
            <MenuCard icon="🏛️" title="INSS Cidadão Digital" desc="Aposentadoria e benefícios" gradient="from-cyan-400 to-cyan-600" onClick={() => setScreen('inss')} />
            <MenuCard icon="🍔" title="ComidaJá" desc="Peça comida em casa" gradient="from-orange-400 to-orange-600" onClick={() => setScreen('comida')} />
            <MenuCard icon="📱" title="Mensagens (SMS)" desc="Cuidado com golpes!" gradient="from-yellow-400 to-yellow-600" onClick={() => setScreen('sms')} badge={semsNaoLidos} />
            <MenuCard icon="🛡️" title="Segurança Digital" desc="Dicas para se proteger" gradient="from-red-400 to-red-600" onClick={() => setScreen('seguranca')} />
          </div>
        </div>
      </div>
    );
  };

  const MenuCard = ({ icon, title, desc, gradient, onClick, badge }) => (
    <button onClick={onClick} className={`w-full bg-gradient-to-r ${gradient} rounded-xl p-5 shadow-lg hover:scale-105 transition text-white relative`}>
      {badge > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold border-2 border-white">{badge}</span>}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{icon}</span>
          <div className="text-left">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-sm opacity-90">{desc}</div>
          </div>
        </div>
        <ChevronRight size={24} />
      </div>
    </button>
  );

  // ==================== CADASTRO SIMPLIFICADO ====================
  const TelaCadastro = () => {
    const [nome, setNome] = useState('');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-md mx-auto pt-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Vamos começar!</h1>
          <p className="text-slate-600 mb-6">Como você quer entrar?</p>

          <div className="bg-white rounded-xl p-6 shadow-md mb-4">
            <label className="block text-sm font-bold mb-2">Como podemos te chamar?</label>
            <input type="text" placeholder="Digite seu primeiro nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-4 border-2 border-slate-300 rounded-lg text-lg mb-4" />
            <button onClick={() => { saveDados({ nome, enderecoSalvo: null }, appData); setScreen('home'); }} disabled={!nome} className="w-full bg-green-500 disabled:bg-slate-300 text-white font-bold py-4 rounded-lg">✓ Entrar</button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-sm text-slate-500">ou entre com</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          <div className="space-y-3">
            <button onClick={() => { saveDados({ nome: 'Valentina', enderecoSalvo: null }, appData); setScreen('home'); }} className="w-full bg-white border-2 border-slate-300 hover:border-slate-400 font-bold py-4 rounded-lg flex items-center justify-center gap-3 shadow-sm">
              <span className="text-2xl">🔵</span>
              <span>Entrar com Google</span>
            </button>
            <button onClick={() => { saveDados({ nome: 'Valentina', enderecoSalvo: null }, appData); setScreen('home'); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3 shadow-sm">
              <span className="text-2xl">📘</span>
              <span>Entrar com Facebook</span>
            </button>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mt-6 flex gap-2">
            <span className="text-2xl">🔒</span>
            <p className="text-sm text-blue-900"><strong>Seguro:</strong> Não pedimos CPF, telefone ou senha. Apenas seu nome para personalizar a experiência!</p>
          </div>
        </div>
      </div>
    );
  };

  // ==================== BANCOS ====================
  const TelaBancos = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6 pt-4">
          <button onClick={() => setScreen('home')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
          <h1 className="text-2xl font-bold">Escolha um Banco</h1>
        </div>
        <div className="space-y-4">
          {Object.values(bancos).map(b => (
            <button key={b.id} onClick={() => { setSelectedBank(b.id); setScreen('login'); }} className={`w-full bg-gradient-to-br ${b.gradient} rounded-2xl p-6 shadow-lg hover:scale-105 transition text-white`}>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-4xl mb-2">{b.logo}</div>
                  <div className="text-xl font-bold">{b.nome}</div>
                </div>
                <ChevronRight size={32} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== LOGIN ====================
  const TelaLogin = () => {
    const banco = bancos[selectedBank];
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [metodo, setMetodo] = useState('senha');
    const handleLogin = () => {
      if (metodo === 'digital') { setScreen('dashboard'); return; }
      if (senha === banco.senha) setScreen('dashboard');
      else setErro('Senha incorreta!');
    };
    return (
      <div className="min-h-screen p-4" style={{ background: `linear-gradient(180deg, ${banco.cor}30, #f8f9fa)` }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6 pt-4">
            <button onClick={() => { setSelectedBank(null); setScreen('bancos'); }} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
            <h1 className="text-2xl font-bold">{banco.nome}</h1>
          </div>
          <div className={`bg-gradient-to-br ${banco.gradient} rounded-2xl p-8 shadow-lg mb-6 text-white`}>
            <div className="text-5xl mb-3">{banco.logo}</div>
            <div className="text-2xl font-bold">{userData?.nome}</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex gap-2 mb-4">
              <button onClick={() => setMetodo('senha')} className={`flex-1 py-3 rounded-lg font-bold ${metodo === 'senha' ? 'bg-blue-500 text-white' : 'bg-slate-200'}`}>🔐 Senha</button>
              <button onClick={() => setMetodo('digital')} className={`flex-1 py-3 rounded-lg font-bold ${metodo === 'digital' ? 'bg-blue-500 text-white' : 'bg-slate-200'}`}>👆 Digital</button>
            </div>
            {metodo === 'senha' ? (
              <>
                <div className="bg-yellow-50 border-2 border-yellow-300 p-3 rounded-lg mb-4 flex gap-2">
                  <span className="text-2xl">{banco.mascote}</span>
                  <p className="text-sm text-yellow-900"><strong>Dica:</strong> Senha simulada: <strong>{banco.senha}</strong></p>
                </div>
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} className="w-full p-4 border-2 border-slate-300 rounded-lg mb-4" />
                {erro && <p className="text-red-600 font-bold mb-4">{erro}</p>}
                <button onClick={handleLogin} disabled={!senha} className="w-full bg-blue-500 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg">Entrar</button>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-7xl mb-4">👆</div>
                <button onClick={handleLogin} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg">Reconhecer</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ==================== DASHBOARDS ====================
  const DashboardVerde = () => (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-gradient-to-br from-green-600 to-green-500 text-white p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><span className="text-3xl">🌿</span><span className="text-xl font-bold">Olá, {userData?.nome.split(' ')[0]}</span></div>
          <div className="flex gap-3">
            <button onClick={() => setShowBalance(!showBalance)}>{showBalance ? <Eye size={22} /> : <EyeOff size={22} />}</button>
            <Bell size={22} />
            <button onClick={sairDaConta} title="Sair"><LogOut size={22} /></button>
          </div>
        </div>
        <div className="bg-white/15 rounded-xl p-3">
          <div className="text-xs opacity-90">Saldo</div>
          <div className="text-2xl font-bold">{showBalance ? `R$ ${bancos.verde.saldo.toFixed(2)}` : 'R$ ••••'}</div>
        </div>
      </div>
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <div className="grid grid-cols-4 gap-3">
            <BtnDash icon="💸" label="Pix" cor="green" onClick={() => setScreen('pix-verde')} />
            <BtnDash icon="📋" label="Pagar" cor="green" onClick={() => setScreen('pagar-verde')} />
            <BtnDash icon="💳" label="Cartões" cor="green" onClick={() => setScreen('cartoes-verde')} />
            <BtnDash icon="📊" label="Extrato" cor="green" onClick={() => setScreen('extrato-verde')} />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300 rounded-xl p-4 mb-4 flex gap-3">
          <span className="text-5xl">🦜</span>
          <div><div className="font-bold text-green-900 mb-1">Dica do Pepê!</div><p className="text-sm text-green-800">Confira o nome de quem vai receber o Pix antes de enviar!</p></div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="font-bold mb-3">Meus Cartões</h3>
          <button onClick={() => setScreen('cartoes-verde')} className="w-full bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-5 text-white shadow-md hover:scale-105 transition">
            <div className="flex justify-between mb-3"><span className="font-bold">CARTÃO VERDE</span><span>VISA</span></div>
            <div className="text-2xl font-bold mb-3">R$ 1.289,75</div>
            <div className="text-xs opacity-90">{userData?.nome}</div>
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-3">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center gap-1 p-2 bg-green-50 rounded-lg"><Home size={20} className="text-green-600" /><span className="text-xs text-green-600 font-bold">Início</span></button>
          <button onClick={() => setScreen('extrato-verde')} className="flex flex-col items-center gap-1 p-2"><FileText size={20} /><span className="text-xs">Atividade</span></button>
          <button onClick={sairDaConta} className="flex flex-col items-center gap-1 p-2"><LogOut size={20} /><span className="text-xs">Sair</span></button>
        </div>
      </div>
    </div>
  );

  const DashboardMarrom = () => (
    <div className="min-h-screen bg-slate-100 pb-24">
      <div className="bg-gradient-to-br from-amber-900 to-amber-800 text-white p-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><span className="text-2xl">🏠</span><div><div className="text-sm font-bold">Conta Corrente</div><div className="text-xs opacity-80">Ag. 2427 · CP. 774720</div></div></div>
          <div className="flex gap-3">
            <button onClick={() => setShowBalance(!showBalance)}>{showBalance ? <Eye size={22} /> : <EyeOff size={22} />}</button>
            <Bell size={22} />
            <button onClick={sairDaConta} title="Sair"><LogOut size={22} /></button>
          </div>
        </div>
        <div className="bg-white text-amber-900 rounded-xl p-4">
          <div className="text-xs text-slate-600 mb-1">Saldo atual</div>
          <div className="text-2xl font-bold">{showBalance ? `R$ ${bancos.marrom.saldo.toFixed(2)}` : 'R$ ••••'}</div>
        </div>
      </div>
      <div className="max-w-md mx-auto p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => setScreen('pagar-marrom')} className="bg-white rounded-2xl p-5 shadow-md hover:scale-105 transition"><div className="text-4xl mb-2 text-center">🧾</div><div className="font-bold text-center text-sm">Pagar Conta</div></button>
          <button onClick={() => setScreen('pix-marrom')} className="bg-white rounded-2xl p-5 shadow-md hover:scale-105 transition"><div className="text-4xl mb-2 text-center">💸</div><div className="font-bold text-center text-sm">Fazer Pix</div></button>
        </div>
        <div className="bg-amber-100 border-l-4 border-amber-700 rounded-r-xl p-4 mb-4 flex gap-3">
          <span className="text-3xl">🦅</span>
          <div><div className="font-bold text-amber-900 text-sm">Águia recomenda</div><p className="text-xs text-amber-800">Pague boletos pelo app, mais seguro!</p></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setScreen('extrato-marrom')} className="bg-white rounded-2xl p-6 shadow-md hover:scale-105 transition"><div className="text-3xl mb-3">📂</div><div className="font-bold text-sm">Minha Conta</div></button>
          <button onClick={() => setScreen('cartoes-marrom')} className="bg-white rounded-2xl p-6 shadow-md hover:scale-105 transition"><div className="text-3xl mb-3">💳</div><div className="font-bold text-sm">Cartão de Crédito</div></button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-amber-900 text-white px-2 py-3">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
          <button className="flex flex-col items-center gap-1 p-1"><Home size={20} /><span className="text-xs font-bold">Início</span></button>
          <button onClick={() => setScreen('extrato-marrom')} className="flex flex-col items-center gap-1 p-1"><FileText size={20} /><span className="text-xs">Extrato</span></button>
          <button onClick={() => setScreen('pix-marrom')} className="flex flex-col items-center gap-1 p-1"><span className="text-xl">💸</span><span className="text-xs">Pix</span></button>
          <button onClick={sairDaConta} className="flex flex-col items-center gap-1 p-1"><LogOut size={20} /><span className="text-xs">Sair</span></button>
        </div>
      </div>
    </div>
  );

  const DashboardRosa = () => (
    <div className="min-h-screen bg-pink-50 pb-24">
      <div className="bg-gradient-to-br from-pink-700 to-pink-600 text-white p-4 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">{userData?.nome[0]}</div><div className="text-lg font-bold">{userData?.nome.split(' ')[0]} ▾</div></div>
          <div className="flex gap-3"><Bell size={22} /><button onClick={sairDaConta} title="Sair"><LogOut size={22} /></button></div>
        </div>
        <div className="bg-white/15 rounded-xl p-3">
          <div className="text-xs opacity-90 mb-1">Saldo disponível</div>
          <div className="text-2xl font-bold">{showBalance ? `R$ ${bancos.rosa.saldo.toFixed(2)}` : 'R$ ••••'}</div>
          <button onClick={() => setShowBalance(!showBalance)} className="text-xs underline mt-1">{showBalance ? 'OCULTAR' : 'MOSTRAR'}</button>
        </div>
      </div>
      <div className="max-w-md mx-auto p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button onClick={() => setScreen('pix-rosa')} className="bg-white rounded-2xl p-4 shadow-md hover:scale-105"><div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">💸</div><div className="text-xs text-center font-bold">Área Pix</div></button>
          <button onClick={() => setScreen('transfer-rosa')} className="bg-white rounded-2xl p-4 shadow-md hover:scale-105"><div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">📤</div><div className="text-xs text-center font-bold">Transferir</div></button>
          <button onClick={() => setScreen('pagar-rosa')} className="bg-white rounded-2xl p-4 shadow-md hover:scale-105"><div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">🧾</div><div className="text-xs text-center font-bold">Pagar</div></button>
        </div>
        <div className="bg-gradient-to-r from-pink-200 to-pink-100 rounded-2xl p-4 mb-4 flex gap-3 shadow-md">
          <span className="text-4xl">🦋</span>
          <div><div className="font-bold text-pink-900 text-sm">Borboleta diz!</div><p className="text-xs text-pink-800">O cartão virtual é o mais seguro online!</p></div>
        </div>
        <button onClick={() => setScreen('cartoes-rosa')} className="w-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-5 text-white shadow-md">
          <div className="font-bold text-lg mb-1">Meus Cartões</div>
          <p className="text-sm opacity-90">Gerencie e crie cartões virtuais</p>
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-200 px-2 py-3">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center gap-1 p-2"><Home size={20} className="text-pink-700" /><span className="text-xs text-pink-700 font-bold">Início</span></button>
          <button onClick={() => setScreen('cartoes-rosa')} className="flex flex-col items-center gap-1 p-2"><span className="text-xl">💳</span><span className="text-xs">Cartões</span></button>
          <button onClick={sairDaConta} className="flex flex-col items-center gap-1 p-2"><LogOut size={20} /><span className="text-xs">Sair</span></button>
        </div>
      </div>
    </div>
  );

  const BtnDash = ({ icon, label, cor, onClick }) => {
    const cores = { green: 'bg-green-100', amber: 'bg-amber-100', pink: 'bg-pink-100' };
    return (
      <button onClick={onClick} className="flex flex-col items-center gap-2 p-2">
        <div className={`w-14 h-14 ${cores[cor]} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>{icon}</div>
        <span className="text-xs font-semibold">{label}</span>
      </button>
    );
  };

  const TelaDashboard = () => {
    if (selectedBank === 'verde') return <DashboardVerde />;
    if (selectedBank === 'marrom') return <DashboardMarrom />;
    if (selectedBank === 'rosa') return <DashboardRosa />;
    return null;
  };

  // ==================== PIX FLUXOS ====================
  const PixFluxoCompleto = ({ banco, voltarPara, corBg, corBtn }) => {
    const [step, setStep] = useState('menu');
    const [chave, setChave] = useState('');
    const [valor, setValor] = useState('');
    const nomeDestinatario = chave.includes('@') ? 'Valentina Silva' : chave.length === 11 ? 'Valentina Santos' : 'Valentina';

    return (
      <div className={`min-h-screen ${corBg} p-4`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6 pt-4">
            <button onClick={() => setScreen(voltarPara)} className="p-2 hover:bg-white rounded-lg"><ArrowLeft size={24} /></button>
            <h1 className="text-2xl font-bold">Pix - {banco.nome}</h1>
          </div>

          {step === 'menu' && (
            <>
              <div className="bg-white border-l-4 rounded-r-xl p-4 mb-6 flex gap-3" style={{ borderColor: banco.cor }}>
                <span className="text-3xl">{banco.mascote}</span>
                <p className="text-sm"><strong>{banco.mascoteNome}:</strong> Sempre confira os dados antes de confirmar!</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <BtnFunc icon="💸" label="Enviar Pix" onClick={() => setStep('chave')} />
                <BtnFunc icon="📷" label="Ler QR Code" onClick={() => setStep('qrcode')} />
                <BtnFunc icon="📋" label="Copia e Cola" onClick={() => setStep('copia')} />
                <BtnFunc icon="📥" label="Receber Pix" onClick={() => setStep('receber')} />
              </div>
              <div className="bg-white rounded-xl shadow-md">
                <BtnLista icon="🔑" label="Minhas Chaves Pix" desc="Suas chaves cadastradas" onClick={() => setStep('chaves')} />
                <BtnLista icon="📈" label="Histórico" desc="Veja Pix enviados e recebidos" onClick={() => setStep('historico')} />
              </div>
            </>
          )}

          {step === 'chave' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Para quem você quer enviar?</h2>
              <input type="text" placeholder="CPF, e-mail, celular ou chave" value={chave} onChange={(e) => setChave(e.target.value)} className="w-full p-4 border-2 rounded-lg mb-4 text-lg" />
              <button onClick={() => setStep('valor')} disabled={!chave} className={`w-full ${corBtn} disabled:bg-slate-300 text-white font-bold py-3 rounded-lg mb-2`}>Continuar</button>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'valor' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Quanto enviar?</h2>
              <div className="bg-slate-100 p-3 rounded-lg mb-4 text-sm">Para: <strong>{chave}</strong></div>
              <input type="number" placeholder="0,00" value={valor} onChange={(e) => setValor(e.target.value)} className="w-full p-4 border-2 rounded-lg mb-4 text-2xl font-bold" />
              <button onClick={() => setStep('confirma')} disabled={!valor} className={`w-full ${corBtn} disabled:bg-slate-300 text-white font-bold py-3 rounded-lg mb-2`}>Continuar</button>
              <button onClick={() => setStep('chave')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'confirma' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Confirme os dados</h2>
              <div className="bg-slate-50 p-4 rounded-lg mb-4 space-y-2">
                <div className="flex justify-between"><span>Para:</span><span className="font-bold">{nomeDestinatario}</span></div>
                <div className="flex justify-between"><span>Chave:</span><span className="font-bold text-sm">{chave}</span></div>
                <div className="flex justify-between text-lg"><span>Valor:</span><span className="font-bold text-green-600">R$ {parseFloat(valor || 0).toFixed(2)}</span></div>
                <div className="flex justify-between"><span>De:</span><span className="font-bold">{userData?.nome}</span></div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 p-3 rounded-lg mb-4 text-sm">⚠️ <strong>Atenção:</strong> Confira tudo! Pix não pode ser desfeito.</div>
              <button onClick={() => setStep('sucesso')} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg mb-2`}>✓ Confirmar e Enviar</button>
              <button onClick={() => setStep('valor')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'sucesso' && <ComprovantePix banco={banco} chave={chave} valor={valor} onVoltar={() => setScreen(voltarPara)} />}

          {step === 'qrcode' && (
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h2 className="text-xl font-bold mb-3">Ler QR Code</h2>
              <div className="bg-slate-100 rounded-xl p-8 mb-4">
                <div className="text-7xl mb-3">📷</div>
                <p className="text-sm text-slate-600">Aponte a câmera para o QR Code</p>
                <div className="mt-4 bg-white border-4 border-slate-800 inline-block p-3 rounded">
                  <div className="grid grid-cols-8 gap-0.5">
                    {[...Array(64)].map((_, i) => <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />)}
                  </div>
                </div>
              </div>
              <button onClick={() => { setChave('11999998888'); setValor('50.00'); setStep('confirma'); }} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg mb-2`}>Simular Leitura</button>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'copia' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-3">Pix Copia e Cola</h2>
              <p className="text-sm text-slate-600 mb-4">Cole aqui o código Pix que você recebeu:</p>
              <textarea placeholder="Cole o código Pix aqui..." rows="4" className="w-full p-3 border-2 rounded-lg mb-4 text-sm font-mono" defaultValue="00020126360014BR.GOV.BCB.PIX0114+5511999998888520400005303986540510.005802BR..." />
              <button onClick={() => { setChave('11999998888'); setValor('10.00'); setStep('confirma'); }} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg mb-2`}>Validar Código</button>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'receber' && (
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <h2 className="text-xl font-bold mb-3">Receber Pix</h2>
              <p className="text-sm text-slate-600 mb-4">Mostre este QR Code para quem vai te pagar:</p>
              <div className="bg-white border-4 border-slate-800 inline-block p-4 rounded mb-4">
                <div className="grid grid-cols-10 gap-0.5">
                  {[...Array(100)].map((_, i) => <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />)}
                </div>
              </div>
              <div className="bg-slate-100 p-3 rounded-lg mb-4 text-sm">
                <div><strong>Recebedor:</strong> {userData?.nome}</div>
                <div><strong>Banco:</strong> {banco.nome}</div>
              </div>
              <button onClick={() => navigator.clipboard?.writeText('00020126...')} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg mb-2 flex items-center justify-center gap-2`}><Copy size={18}/> Copiar Código Pix</button>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'chaves' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Suas Chaves Pix</h2>
              <div className="space-y-3 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-2"><span className="text-xl">🆔</span><div><div className="text-xs text-slate-500">CPF</div><div className="font-bold">{userData?.cpf}</div></div></div>
                <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-2"><span className="text-xl">📱</span><div><div className="text-xs text-slate-500">Celular</div><div className="font-bold">{userData?.telefone}</div></div></div>
                <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-2"><span className="text-xl">🔑</span><div><div className="text-xs text-slate-500">Aleatória</div><div className="font-bold text-xs">a1b2c3d4-e5f6-7g8h-i9j0</div></div></div>
              </div>
              <button onClick={() => setStep('menu')} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg`}>Voltar</button>
            </div>
          )}

          {step === 'historico' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Histórico de Pix</h2>
              <div className="space-y-2 mb-4">
                {[
                  { tipo: 'Enviado', valor: '-150,00', nome: 'João Silva', data: '23/04' },
                  { tipo: 'Recebido', valor: '+200,00', nome: 'Maria Santos', data: '22/04' },
                  { tipo: 'Enviado', valor: '-50,00', nome: 'Pedro Costa', data: '20/04' }
                ].map((tx, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg flex justify-between">
                    <div>
                      <div className="font-bold text-sm">{tx.tipo}: {tx.nome}</div>
                      <div className="text-xs text-slate-500">{tx.data}</div>
                    </div>
                    <div className={`font-bold ${tx.valor.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>R$ {tx.valor}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep('menu')} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg`}>Voltar</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const BtnFunc = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="bg-white rounded-xl p-4 shadow-md hover:scale-105 transition flex flex-col items-center gap-2">
      <div className="text-3xl">{icon}</div>
      <span className="text-sm font-bold">{label}</span>
    </button>
  );

  const BtnLista = ({ icon, label, desc, onClick }) => (
    <button onClick={onClick} className="w-full p-4 hover:bg-slate-50 transition flex items-center gap-3 border-b border-slate-100 last:border-0">
      <span className="text-2xl">{icon}</span>
      <div className="text-left flex-1">
        <div className="font-bold">{label}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
      <ChevronRight className="text-slate-400" size={20} />
    </button>
  );

  // ==================== COMPROVANTE PIX ====================
  const ComprovantePix = ({ banco, chave, valor, onVoltar }) => {
    const [shared, setShared] = useState(false);
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center mb-4">
          <div className="text-6xl mb-3">✅</div>
          <h2 className="text-2xl font-bold">Pix Enviado!</h2>
        </div>
        <div className={`bg-gradient-to-br ${banco.gradient} text-white rounded-xl p-5 mb-4`}>
          <div className="text-xs opacity-90 mb-2">Comprovante - {banco.nome}</div>
          <div className="text-3xl font-bold mb-3">R$ {parseFloat(valor || 0).toFixed(2)}</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="opacity-80">Para:</span><span className="font-bold">{chave}</span></div>
            <div className="flex justify-between"><span className="opacity-80">De:</span><span className="font-bold">{userData?.nome}</span></div>
            <div className="flex justify-between"><span className="opacity-80">Data:</span><span>{new Date().toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span className="opacity-80">ID:</span><span className="text-xs">PIX-{banco.id.toUpperCase()}-{Math.floor(Math.random() * 999999)}</span></div>
          </div>
        </div>
        <h3 className="font-bold mb-3">Compartilhar comprovante</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button onClick={() => setShared(true)} className="bg-green-500 text-white p-3 rounded-lg flex flex-col items-center gap-1"><span className="text-2xl">📱</span><span className="text-xs font-bold">WhatsApp</span></button>
          <button onClick={() => setShared(true)} className="bg-blue-500 text-white p-3 rounded-lg flex flex-col items-center gap-1"><span className="text-2xl">📧</span><span className="text-xs font-bold">E-mail</span></button>
          <button onClick={() => setShared(true)} className="bg-slate-500 text-white p-3 rounded-lg flex flex-col items-center gap-1"><span className="text-2xl">💾</span><span className="text-xs font-bold">Salvar</span></button>
        </div>
        {shared && <div className="bg-green-50 border-2 border-green-300 p-3 rounded-lg mb-4 text-sm text-green-900">✓ Comprovante compartilhado!</div>}
        <button onClick={onVoltar} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"><Home size={20} /> Voltar à Tela Inicial</button>
      </div>
    );
  };

  // ==================== EXTRATO ====================
  const TelaExtrato = ({ bancoId }) => {
    const banco = bancos[bancoId];
    const transacoes = [
      { data: '23/04/2026', tipo: 'Pix Enviado', valor: '-R$ 150,00', icon: '📤' },
      { data: '22/04/2026', tipo: 'Recebido', valor: '+R$ 500,00', icon: '💰' },
      { data: '21/04/2026', tipo: 'Compra Online', valor: '-R$ 89,90', icon: '🛍️' },
      { data: '20/04/2026', tipo: 'Pix Recebido', valor: '+R$ 200,00', icon: '📥' },
    ];
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6 pt-4">
            <button onClick={() => setScreen('dashboard')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
            <h1 className="text-2xl font-bold">Extrato</h1>
          </div>
          <div className={`bg-gradient-to-br ${banco.gradient} text-white rounded-xl p-5 mb-4`}>
            <div className="text-sm opacity-90">Saldo atual</div>
            <div className="text-3xl font-bold">R$ {banco.saldo.toFixed(2)}</div>
          </div>
          <div className="space-y-3">
            {transacoes.map((tx, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3"><span className="text-2xl">{tx.icon}</span><div><div className="font-bold">{tx.tipo}</div><div className="text-sm text-slate-500">{tx.data}</div></div></div>
                <div className={`font-bold text-lg ${tx.valor.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{tx.valor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ==================== PAGAR ====================
  const TelaPagar = ({ bancoId }) => {
    const [step, setStep] = useState(1);
    const [codigo, setCodigo] = useState('');
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6 pt-4">
            <button onClick={() => setScreen('dashboard')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
            <h1 className="text-2xl font-bold">Pagar Conta</h1>
          </div>
          {step === 1 && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Digite o código de barras</h2>
              <input type="text" placeholder="00000.00000 00000.000000..." value={codigo} onChange={(e) => setCodigo(e.target.value)} className="w-full p-4 border-2 rounded-lg mb-4 text-sm" />
              <button onClick={() => setStep(2)} disabled={!codigo} className="w-full bg-blue-500 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg">Continuar</button>
            </div>
          )}
          {step === 2 && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Confirmar pagamento</h2>
              <div className="bg-slate-100 rounded-lg p-4 space-y-2 mb-4">
                <div className="flex justify-between"><span>Empresa:</span><span className="font-bold">Energia SA</span></div>
                <div className="flex justify-between"><span>Vencimento:</span><span className="font-bold">28/04/2026</span></div>
                <div className="flex justify-between"><span>Valor:</span><span className="font-bold text-lg">R$ 145,80</span></div>
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg mb-2">Confirmar</button>
              <button onClick={() => setStep(1)} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}
          {step === 3 && (
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="text-6xl mb-3">✅</div>
              <h2 className="text-2xl font-bold mb-2">Pagamento Realizado!</h2>
              <p className="text-slate-600 mb-4">R$ 145,80 - Energia SA</p>
              <button onClick={() => setScreen('dashboard')} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"><Home size={20} /> Voltar à Tela Inicial</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==================== CARTÕES (corrigido) ====================
  const TelaCartoes = ({ bancoId }) => {
    const banco = bancos[bancoId];
    const [step, setStep] = useState('menu');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [tipoBloqueio, setTipoBloqueio] = useState(null);
    const [valorPagamento, setValorPagamento] = useState('');
    const [pagamentoFeito, setPagamentoFeito] = useState(null);
    const cartao = appData.cartoesVirtuais[bancoId];
    const corBg = bancoId === 'verde' ? 'bg-green-50' : bancoId === 'marrom' ? 'bg-amber-50' : 'bg-pink-50';
    const corBtn = bancoId === 'verde' ? 'bg-green-600' : bancoId === 'marrom' ? 'bg-amber-700' : 'bg-pink-600';
    const corHover = bancoId === 'verde' ? 'hover:bg-green-100' : bancoId === 'marrom' ? 'hover:bg-amber-100' : 'hover:bg-pink-100';

    const validarSenha = () => {
      if (senha === banco.senha) {
        if (cartao) setStep('cartao');
        else setStep('criar');
        setErro(''); setSenha('');
      } else { setErro('Senha incorreta!'); }
    };

    const criarCartao = () => {
      const limite = bancoId === 'verde' ? 500 : bancoId === 'marrom' ? 800 : 600;
      const novo = {
        numero: `${4567} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        validade: '04/27', cvv: Math.floor(100 + Math.random() * 900).toString(),
        limite, titular: userData?.nome
      };
      const newAppData = { ...appData, cartoesVirtuais: { ...appData.cartoesVirtuais, [bancoId]: novo } };
      setAppData(newAppData);
      localStorage.setItem('appIdososV4', JSON.stringify({ user: userData, appData: newAppData }));
      setStep('cartao');
    };

    return (
      <div className={`min-h-screen ${corBg} p-4`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6 pt-4">
            <button onClick={() => setScreen('dashboard')} className={`p-2 ${corHover} rounded-lg`}><ArrowLeft size={24} /></button>
            <h1 className="text-2xl font-bold">Gerenciar Cartões</h1>
          </div>

          {step === 'menu' && (
            <>
              <div className="bg-white border-l-4 rounded-r-xl p-4 mb-4 flex gap-3" style={{ borderColor: banco.cor }}>
                <span className="text-3xl">{banco.mascote}</span>
                <p className="text-sm"><strong>{banco.mascoteNome}:</strong> Cartão virtual é o mais seguro online!</p>
              </div>
              <div className={`bg-gradient-to-r ${banco.gradient} rounded-xl p-5 text-white shadow-md mb-4`}>
                <div className="flex justify-between mb-2"><span className="font-bold">CARTÃO {banco.nome.toUpperCase()}</span><span>VISA</span></div>
                <div className="text-2xl font-bold mb-2">R$ {(banco.saldo * 0.5).toFixed(2)}</div>
                <div className="text-xs opacity-90">{userData?.nome}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <BtnFunc icon="🧾" label="Pagar Fatura" onClick={() => setStep('fatura')} />
                <BtnFunc icon="🔒" label="Cartão Virtual" onClick={() => {
                  if (selectedBank === 'verde') {
                    setStep('senha');
                  } else {
                    setStep('criar');
                  }
                }} />
                <BtnFunc icon="🚫" label="Bloquear" onClick={() => setStep('bloquear')} />
                <BtnFunc icon="📊" label="Limite e Compras" onClick={() => setStep('limite')} />
              </div>
            </>
          )}

          {step === 'senha' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Confirme sua senha</h2>
              <p className="text-sm text-slate-600 mb-4">No {banco.nome}, é necessário confirmar para acessar cartões virtuais. Senha: <strong>{banco.senha}</strong></p>
              <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full p-4 border-2 rounded-lg mb-4 text-lg" />
              {erro && <p className="text-red-600 font-bold mb-3">{erro}</p>}
              <button onClick={validarSenha} disabled={!senha} className={`w-full ${corBtn} disabled:bg-slate-300 text-white font-bold py-3 rounded-lg mb-2`}>Confirmar</button>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'criar' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-2">Criar Cartão Virtual</h2>
              <p className="text-sm text-slate-600 mb-4">Mais segurança nas compras online.</p>
              <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-lg mb-4">
                <div className="font-bold mb-1">Limite: R$ {bancoId === 'verde' ? 500 : bancoId === 'marrom' ? 800 : 600},00</div>
                <div className="text-xs text-slate-600">Válido por 30 dias</div>
                <div className="text-xs text-slate-600">Titular: <strong>{userData?.nome}</strong></div>
              </div>
              <button onClick={criarCartao} className={`w-full ${corBtn} text-white font-bold py-4 rounded-lg`}>+ Criar Cartão</button>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-200 font-bold py-2 rounded-lg mt-2">Voltar</button>
            </div>
          )}

          {step === 'cartao' && cartao && <CartaoVirtualVisual cartao={cartao} banco={banco} onVoltar={() => setStep('menu')} />}

          {step === 'fatura' && !pagamentoFeito && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Pagar Fatura</h2>
              <div className="bg-slate-50 p-4 rounded-lg mb-4 space-y-2">
                <div className="flex justify-between"><span>Fatura atual:</span><span className="font-bold">R$ 1.289,75</span></div>
                <div className="flex justify-between"><span>Vencimento:</span><span className="font-bold">10/05/2026</span></div>
                <div className="flex justify-between"><span>Valor mínimo:</span><span className="font-bold">R$ 193,46</span></div>
              </div>
              <div className="space-y-2 mb-4">
                <button onClick={() => setPagamentoFeito({ tipo: 'total', valor: 1289.75 })} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg`}>Pagar Total - R$ 1.289,75</button>
                <button onClick={() => setPagamentoFeito({ tipo: 'minimo', valor: 193.46 })} className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg">Pagar Mínimo - R$ 193,46</button>
                <button onClick={() => setStep('outro-valor')} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg">Pagar Outro Valor</button>
              </div>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-300 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'outro-valor' && !pagamentoFeito && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Digite o valor</h2>
              <div className="bg-slate-50 p-3 rounded-lg mb-4 text-sm">
                <div>Mínimo: R$ 193,46</div>
                <div>Total: R$ 1.289,75</div>
              </div>
              <label className="block text-sm font-bold mb-2">Valor (R$)</label>
              <input type="number" placeholder="0,00" value={valorPagamento} onChange={(e) => setValorPagamento(e.target.value)} className="w-full p-4 border-2 rounded-lg mb-4 text-2xl font-bold" />
              <button onClick={() => setPagamentoFeito({ tipo: 'outro', valor: parseFloat(valorPagamento) })} disabled={!valorPagamento || parseFloat(valorPagamento) < 193.46} className={`w-full ${corBtn} disabled:bg-slate-300 text-white font-bold py-3 rounded-lg mb-2`}>Confirmar Pagamento</button>
              {valorPagamento && parseFloat(valorPagamento) < 193.46 && <p className="text-red-600 text-sm mb-2">Valor abaixo do mínimo</p>}
              <button onClick={() => setStep('fatura')} className="w-full bg-slate-300 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {pagamentoFeito && (
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-6xl mb-3">✅</div>
              <h2 className="text-2xl font-bold mb-2">Pagamento Realizado!</h2>
              <div className="bg-slate-50 p-4 rounded-lg my-4 text-left">
                <div className="flex justify-between mb-1"><span>Tipo:</span><span className="font-bold capitalize">{pagamentoFeito.tipo === 'total' ? 'Pagamento total' : pagamentoFeito.tipo === 'minimo' ? 'Pagamento mínimo' : 'Valor personalizado'}</span></div>
                <div className="flex justify-between mb-1"><span>Valor pago:</span><span className="font-bold text-green-600">R$ {pagamentoFeito.valor.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Data:</span><span className="font-bold">{new Date().toLocaleDateString()}</span></div>
              </div>
              <button onClick={() => { setPagamentoFeito(null); setValorPagamento(''); setStep('menu'); }} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg`}>Voltar ao Menu</button>
            </div>
          )}

          {step === 'bloquear' && !tipoBloqueio && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Bloquear Cartão</h2>
              <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg mb-4">
                <p className="text-sm text-red-900"><strong>⚠️ Atenção:</strong> Ao bloquear, seu cartão para de funcionar imediatamente.</p>
              </div>
              <div className="space-y-2 mb-4">
                <button onClick={() => setTipoBloqueio('temporario')} className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg">🔒 Bloquear Temporariamente</button>
                <button onClick={() => setTipoBloqueio('permanente')} className="w-full bg-red-500 text-white font-bold py-3 rounded-lg">🚫 Bloquear por Perda/Roubo</button>
              </div>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'bloquear' && tipoBloqueio && (
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-6xl mb-3">{tipoBloqueio === 'temporario' ? '🔒' : '🚫'}</div>
              <h2 className="text-2xl font-bold mb-2">Cartão Bloqueado!</h2>
              <p className="text-slate-600 mb-4">{tipoBloqueio === 'temporario' ? 'Seu cartão foi bloqueado temporariamente. Você pode desbloqueá-lo a qualquer momento.' : 'Seu cartão foi bloqueado permanentemente. Um novo cartão será enviado ao seu endereço em até 7 dias úteis.'}</p>
              <div className="bg-slate-50 p-4 rounded-lg mb-4 text-left text-sm">
                <div className="flex justify-between mb-1"><span>Status:</span><span className="font-bold text-red-600">Bloqueado</span></div>
                <div className="flex justify-between mb-1"><span>Tipo:</span><span className="font-bold">{tipoBloqueio === 'temporario' ? 'Temporário' : 'Permanente'}</span></div>
                <div className="flex justify-between"><span>Data:</span><span className="font-bold">{new Date().toLocaleDateString()}</span></div>
              </div>
              {tipoBloqueio === 'temporario' && <button onClick={() => { setTipoBloqueio(null); setStep('menu'); alert('Cartão desbloqueado!'); }} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg mb-2">Desbloquear Cartão</button>}
              <button onClick={() => { setTipoBloqueio(null); setStep('menu'); }} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg`}>Voltar ao Menu</button>
            </div>
          )}

          {step === 'limite' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Limite e Compras</h2>
              <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2"><span>Limite total:</span><span className="font-bold">R$ 8.843,00</span></div>
                <div className="flex justify-between mb-2"><span>Utilizado:</span><span className="font-bold text-red-600">R$ 2.827,00</span></div>
                <div className="flex justify-between mb-3"><span>Disponível:</span><span className="font-bold text-green-600">R$ 6.016,00</span></div>
                <div className="w-full bg-slate-200 rounded-full h-3"><div className="bg-amber-500 h-3 rounded-full" style={{ width: '32%' }}></div></div>
              </div>
              <h3 className="font-bold mb-2">Últimas Compras</h3>
              <div className="space-y-2 mb-4">
                {[
                  { nome: 'Farmácia São Paulo', valor: '89,50', data: '22/04' },
                  { nome: 'Supermercado', valor: '345,80', data: '21/04' },
                  { nome: 'Posto Combustível', valor: '120,00', data: '20/04' }
                ].map((c, i) => (
                  <div key={i} className="flex justify-between p-3 bg-slate-50 rounded-lg">
                    <div><div className="font-bold text-sm">{c.nome}</div><div className="text-xs text-slate-500">{c.data}</div></div>
                    <div className="font-bold">R$ {c.valor}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep('menu')} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg`}>Voltar</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CartaoVirtualVisual = ({ cartao, banco, onVoltar }) => {
    const [copied, setCopied] = useState(false);
    return (
      <div className="space-y-4">
        <div className={`bg-gradient-to-br ${banco.gradient} text-white rounded-2xl p-6 shadow-xl`}>
          <div className="flex justify-between mb-6">
            <span className="text-sm opacity-90">Cartão Virtual</span>
            <span className="text-sm font-bold">{banco.nome}</span>
          </div>
          <div className="text-2xl font-mono font-bold mb-4 break-all">{cartao.numero}</div>
          <div className="text-xs opacity-75 mb-1">Titular</div>
          <div className="text-lg font-bold mb-4 uppercase">{cartao.titular}</div>
          <div className="flex justify-between">
            <div><div className="text-xs opacity-75">Validade</div><div className="font-mono font-bold">{cartao.validade}</div></div>
            <div><div className="text-xs opacity-75">CVV</div><div className="font-mono font-bold">{cartao.cvv}</div></div>
            <div><div className="text-xs opacity-75">Limite</div><div className="font-mono font-bold">R$ {cartao.limite}</div></div>
          </div>
        </div>
        <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 flex gap-3">
          <span className="text-2xl">📝</span>
          <div><div className="font-bold text-amber-900 mb-1">Dica importante!</div><p className="text-sm text-amber-800">Anote os dados em um papel para usar nas compras online!</p></div>
        </div>
        <button onClick={() => { try { navigator.clipboard?.writeText(cartao.numero); } catch(e){} setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"><Copy size={20} /> {copied ? 'Copiado!' : 'Copiar Número'}</button>
        <button onClick={onVoltar} className="w-full bg-slate-200 font-bold py-3 rounded-lg">Voltar</button>
      </div>
    );
  };

  // ==================== MOBILIDADE URBANA ====================
  const TelaMobilidade = () => {
    const [step, setStep] = useState('inicial');
    const [origem, setOrigem] = useState(userData?.endereco || 'Rua das Flores, 123');
    const [destino, setDestino] = useState('');
    const [veiculo, setVeiculo] = useState(null);
    const [pagamento, setPagamento] = useState(null);
    const [estrelas, setEstrelas] = useState(0);
    const [comentario, setComentario] = useState('');
    const [novoCartao, setNovoCartao] = useState({ numero: '', validade: '', cvv: '', salvar: false });

    const veiculos = [
      { id: 'eco', icon: '🚗', nome: 'Econômico', preco: 28.50, tempo: '12 min', desc: 'Mais barato' },
      { id: 'comfort', icon: '🚙', nome: 'Conforto', preco: 35.80, tempo: '10 min', desc: 'Carros melhores' },
      { id: 'premium', icon: '🚘', nome: 'Premium', preco: 55.00, tempo: '8 min', desc: 'Luxo total' }
    ];

    useEffect(() => {
      if (step === 'procurando') { const t = setTimeout(() => setStep('motorista'), 4000); return () => clearTimeout(t); }
      if (step === 'motorista') { const t = setTimeout(() => setStep('corrida'), 5000); return () => clearTimeout(t); }
      if (step === 'corrida') { const t = setTimeout(() => setStep('avaliar'), 40000); return () => clearTimeout(t); }
    }, [step]);

    if (step === 'inicial') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 p-4">
          <div className="flex items-center gap-3 mb-6 pt-2">
            <button onClick={() => setScreen('home')} className="p-2 hover:bg-white/10 rounded-lg"><ArrowLeft size={24} className="text-white" /></button>
            <h1 className="text-2xl font-bold text-white">Mobi Cidade</h1>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-3xl p-8 mb-6 text-white text-center shadow-2xl">
            <div className="text-7xl mb-4">🚗</div>
            <h2 className="text-2xl font-bold mb-2">Para onde você quer ir?</h2>
            <p className="opacity-90 text-sm">Corridas seguras com motoristas avaliados</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-xl mb-4">
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-600 uppercase">📍 De onde</label><input type="text" value={origem} onChange={(e) => setOrigem(e.target.value)} className="w-full p-3 border-b-2 text-lg" /></div>
              <div><label className="text-xs font-bold text-slate-600 uppercase">🎯 Para onde</label><input type="text" placeholder="Seu destino" value={destino} onChange={(e) => setDestino(e.target.value)} className="w-full p-3 border-b-2 text-lg" /></div>
            </div>
            <button onClick={() => setStep('veiculo')} disabled={!origem || !destino} className="w-full bg-gradient-to-r from-purple-600 to-purple-500 disabled:from-slate-300 text-white font-bold py-4 rounded-xl mt-6">Buscar Carros 🚀</button>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-white">
            <div className="font-bold mb-1">💡 Dica de Segurança</div>
            <p className="text-sm opacity-90">Sempre confira o nome e a placa do motorista antes de entrar!</p>
          </div>
        </div>
      );
    }

    if (step === 'veiculo') {
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6 pt-2">
              <button onClick={() => setStep('inicial')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
              <h1 className="text-2xl font-bold">Escolha o Veículo</h1>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md mb-4 text-xs">
              <div>📍 De: {origem}</div>
              <div>🎯 Para: {destino}</div>
            </div>
            <div className="space-y-3 mb-4">
              {veiculos.map(v => (
                <button key={v.id} onClick={() => setVeiculo(v.id)} className={`w-full p-5 rounded-xl border-2 ${veiculo === v.id ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><span className="text-4xl">{v.icon}</span><div className="text-left"><div className="font-bold text-lg">{v.nome}</div><div className="text-xs text-slate-500">{v.desc} · {v.tempo}</div></div></div>
                    <div className="font-bold text-lg">R$ {v.preco.toFixed(2)}</div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep('pagamento')} disabled={!veiculo} className="w-full bg-purple-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl">Continuar</button>
          </div>
        </div>
      );
    }

    if (step === 'pagamento') {
      const cartoesDisponiveis = Object.entries(appData.cartoesVirtuais).filter(([, c]) => c);
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6 pt-2">
              <button onClick={() => setStep('veiculo')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
              <h1 className="text-2xl font-bold">Pagamento</h1>
            </div>
            <div className="space-y-3 mb-4">
              {[
                { id: 'dinheiro', icon: '💵', nome: 'Dinheiro', desc: 'Pagar ao motorista' },
                { id: 'pix', icon: '💸', nome: 'Pix', desc: 'Pagamento instantâneo' },
                { id: 'credito', icon: '💳', nome: 'Crédito', desc: 'Cartão físico ou virtual' },
                { id: 'debito', icon: '💰', nome: 'Débito', desc: 'Direto da conta' }
              ].map(p => (
                <button key={p.id} onClick={() => setPagamento(p.id)} className={`w-full p-4 rounded-xl border-2 ${pagamento === p.id ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-center gap-3"><span className="text-2xl">{p.icon}</span><div className="text-left"><div className="font-bold">{p.nome}</div><div className="text-xs text-slate-500">{p.desc}</div></div></div>
                </button>
              ))}
              {appData.cartaoMobi && (
                <div className="bg-blue-50 border-2 border-blue-300 p-3 rounded-lg text-sm">
                  💳 <strong>Cartão salvo:</strong> Final {appData.cartaoMobi.numero.slice(-4)}
                </div>
              )}
            </div>
            <button onClick={() => {
              if (pagamento === 'credito' || pagamento === 'debito') {
                if (appData.cartaoMobi) setStep('procurando');
                else setStep('cartao');
              } else if (pagamento === 'pix') {
                setStep('pix');
              } else {
                setStep('procurando');
              }
            }} disabled={!pagamento} className="w-full bg-green-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl">Chamar Carro</button>
          </div>
        </div>
      );
    }

    if (step === 'cartao') {
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6 pt-2">
              <button onClick={() => setStep('pagamento')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
              <h1 className="text-2xl font-bold">Dados do Cartão</h1>
            </div>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-4 flex gap-3">
              <span className="text-3xl">💡</span>
              <div><div className="font-bold text-blue-900 mb-1">Salve seu cartão!</div><p className="text-sm text-blue-800">Após salvar, ele fica guardado para próximas corridas. Não precisa digitar novamente!</p></div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md space-y-4 mb-4">
              <div>
                <label className="text-sm font-bold mb-1 block">Número do Cartão</label>
                <input type="text" placeholder="0000 0000 0000 0000" value={novoCartao.numero} onChange={(e) => setNovoCartao({ ...novoCartao, numero: e.target.value })} className="w-full p-3 border-2 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-bold mb-1 block">Validade</label><input type="text" placeholder="MM/AA" value={novoCartao.validade} onChange={(e) => setNovoCartao({ ...novoCartao, validade: e.target.value })} className="w-full p-3 border-2 rounded-lg" /></div>
                <div><label className="text-sm font-bold mb-1 block">CVV</label><input type="text" placeholder="000" value={novoCartao.cvv} onChange={(e) => setNovoCartao({ ...novoCartao, cvv: e.target.value })} className="w-full p-3 border-2 rounded-lg" /></div>
              </div>
              <label className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg cursor-pointer">
                <input type="checkbox" checked={novoCartao.salvar} onChange={(e) => setNovoCartao({ ...novoCartao, salvar: e.target.checked })} className="w-5 h-5" />
                <span className="text-sm font-bold text-blue-900">Salvar para próximas corridas</span>
              </label>
            </div>
            <button onClick={() => {
              if (novoCartao.salvar) saveDados(userData, { ...appData, cartaoMobi: novoCartao });
              setStep('procurando');
            }} disabled={!novoCartao.numero || !novoCartao.validade || !novoCartao.cvv} className="w-full bg-green-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl">Confirmar e Chamar Carro</button>
          </div>
        </div>
      );
    }

    if (step === 'pix') {
      const codigoPix = 'abc123def456ghi789jkl';
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6 pt-2">
              <button onClick={() => setStep('pagamento')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
              <h1 className="text-2xl font-bold">PIX - Pagamento</h1>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 shadow-md mb-4">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">📱</div>
                <div className="font-bold text-slate-900 mb-2">QR Code</div>
                <p className="text-sm text-slate-600">Escaneie com seu telefone</p>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4 border-2 border-slate-200 text-center text-2xl font-bold text-slate-400">
                [QR Code]
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md mb-4">
              <div className="font-bold text-slate-900 mb-2">Ou copie a chave:</div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={codigoPix} 
                  readOnly 
                  className="flex-1 p-3 border-2 border-slate-300 rounded-lg bg-slate-50 font-mono text-sm"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(codigoPix);
                    alert('✅ Código PIX copiado!');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-3 rounded-lg"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-4 flex gap-3">
              <span className="text-2xl">⏱️</span>
              <div><div className="font-bold text-amber-900 mb-1">Tempo para pagar</div><p className="text-sm text-amber-800">Você tem 5 minutos para completar o pagamento via PIX</p></div>
            </div>
            <button onClick={() => {
              alert('✅ PIX confirmado! Sua corrida foi paga.');
              setStep('procurando');
            }} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl mb-2">Já Paguei via PIX</button>
            <button onClick={() => setStep('pagamento')} className="w-full bg-slate-200 text-slate-900 font-bold py-2 rounded-xl">Voltar</button>
          </div>
        </div>
      );
    }

    if (step === 'procurando') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-500 flex flex-col items-center justify-center p-4">
          <div className="text-7xl mb-4 animate-bounce">🚗</div>
          <div className="text-2xl font-bold text-white mb-2">Procurando motorista...</div>
          <div className="text-sm text-white/80 mb-6">Aguarde alguns instantes</div>
          <div className="w-full max-w-md bg-white/20 rounded-full h-3 overflow-hidden"><div className="bg-white h-3 rounded-full" style={{ animation: 'progressBar 4s linear forwards' }} /></div>
          <style>{`@keyframes progressBar { from { width: 0%; } to { width: 100%; } }`}</style>
        </div>
      );
    }

    if (step === 'motorista') {
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-xl mb-4">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">✅</div>
                <div className="text-xl font-bold">Motorista Encontrado!</div>
              </div>
              <div className="bg-slate-100 rounded-xl p-4 mb-4 flex items-center gap-4">
                <div className="text-5xl">👨‍💼</div>
                <div>
                  <div className="font-bold text-lg">Carlos Silva</div>
                  <div className="flex items-center gap-1"><Star size={16} className="fill-yellow-400 text-yellow-400" /><span className="text-sm">4.8 (532 corridas)</span></div>
                  <div className="text-sm text-slate-600">Toyota Corolla Prata</div>
                  <div className="text-sm font-bold">Placa: ABC-1234</div>
                </div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-xl">
                <div className="font-bold text-blue-900 mb-1">Iniciando corrida automaticamente...</div>
                <p className="text-sm text-blue-800">A corrida começa em alguns segundos</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (step === 'corrida') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-500 flex flex-col items-center justify-center p-4">
          <div className="text-7xl mb-4 animate-pulse">🚕</div>
          <div className="text-2xl font-bold text-white mb-2">Em viagem...</div>
          <div className="text-sm text-white/80 mb-6">Você está a caminho do destino</div>
          <div className="bg-white rounded-2xl p-5 mb-4 w-full max-w-sm">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><MapPin size={16} className="text-green-600" /><span>{origem}</span></div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-red-600" /><span>{destino}</span></div>
            </div>
          </div>
          <div className="w-full max-w-md bg-white/20 rounded-full h-3 overflow-hidden"><div className="bg-white h-3 rounded-full" style={{ animation: 'progressBar2 40s linear forwards' }} /></div>
          <style>{`@keyframes progressBar2 { from { width: 0%; } to { width: 100%; } }`}</style>
        </div>
      );
    }

    if (step === 'avaliar') {
      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
              <div className="text-6xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Você chegou!</h2>
              <div className="bg-slate-100 p-4 rounded-xl text-left text-sm space-y-2 mb-6">
                <div className="flex justify-between"><span>Motorista:</span><span className="font-bold">Carlos Silva</span></div>
                <div className="flex justify-between"><span>Distância:</span><span className="font-bold">8,5 km</span></div>
                <div className="flex justify-between"><span>Tempo:</span><span className="font-bold">18 min</span></div>
                <div className="flex justify-between border-t-2 pt-2"><span className="font-bold">Total:</span><span className="font-bold text-lg text-green-600">R$ {veiculos.find(v => v.id === veiculo)?.preco.toFixed(2)}</span></div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-4">
                <p className="text-sm font-bold text-yellow-900 mb-3">Como foi a viagem?</p>
                <div className="flex gap-2 justify-center mb-3">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setEstrelas(n)} className="text-4xl hover:scale-125 transition">{n <= estrelas ? '⭐' : '☆'}</button>
                  ))}
                </div>
                <textarea placeholder="Comentário (opcional)" value={comentario} onChange={(e) => setComentario(e.target.value)} className="w-full p-2 border-2 rounded-lg text-sm" rows="2" />
              </div>
              <button onClick={() => { setStep('inicial'); setScreen('home'); }} disabled={estrelas === 0} className="w-full bg-purple-600 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl">{estrelas === 0 ? 'Avalie para continuar' : 'Enviar Avaliação'}</button>
            </div>
          </div>
        </div>
      );
    }
  };

  // ==================== COMPRA FÁCIL ====================
  const TelaLoja = () => {
    const [tab, setTab] = useState('produtos');
    const [busca, setBusca] = useState('');
    const [step, setStep] = useState('lista');
    const [carrinho, setCarrinho] = useState([]);
    const [pagamento, setPagamento] = useState(null);
    const [dadosCartao, setDadosCartao] = useState({ numero: '', validade: '', cvv: '' });
    const [pixCopiado, setPixCopiado] = useState(false);

    const produtos = [
      { id: 1, nome: 'Teclado Sem Fio', preco: 89.90, emoji: '⌨️', categoria: 'Eletrônicos' },
      { id: 2, nome: 'Mouse Óptico', preco: 45.50, emoji: '🖱️', categoria: 'Eletrônicos' },
      { id: 3, nome: 'Fone Bluetooth', preco: 120.00, emoji: '🎧', categoria: 'Eletrônicos' },
      { id: 4, nome: 'Webcam HD', preco: 150.00, emoji: '📷', categoria: 'Eletrônicos' },
      { id: 5, nome: 'Cafeteira', preco: 199.90, emoji: '☕', categoria: 'Casa' },
      { id: 6, nome: 'Liquidificador', preco: 159.00, emoji: '🥤', categoria: 'Casa' },
      { id: 7, nome: 'Livro de Receitas', preco: 49.90, emoji: '📚', categoria: 'Livros' },
      { id: 8, nome: 'Travesseiro', preco: 79.90, emoji: '🛏️', categoria: 'Casa' },
      { id: 9, nome: 'Relógio Digital', preco: 95.00, emoji: '⌚', categoria: 'Acessórios' },
      { id: 10, nome: 'Carregador USB', preco: 29.90, emoji: '🔌', categoria: 'Eletrônicos' }
    ];

    const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.categoria.toLowerCase().includes(busca.toLowerCase()));

    const adicionar = (p) => {
      const ex = carrinho.find(i => i.id === p.id);
      if (ex) setCarrinho(carrinho.map(i => i.id === p.id ? { ...i, qtd: i.qtd + 1 } : i));
      else setCarrinho([...carrinho, { ...p, qtd: 1 }]);
    };

    const total = carrinho.reduce((s, p) => s + p.preco * p.qtd, 0);

    const finalizarCompra = () => {
      const novoPedido = {
        id: `PED-${Date.now()}`, itens: carrinho, total: parseFloat(total.toFixed(2)), pagamento,
        data: new Date().toLocaleDateString(), status: 'Aprovado',
        rastreamento: ['✅ Pedido confirmado', '📦 Em separação', '🚚 Em transporte', '🏠 Aguardando entrega']
      };
      const newAppData = { ...appData, pedidos: [novoPedido, ...appData.pedidos] };
      setAppData(newAppData);
      localStorage.setItem('appIdososV4', JSON.stringify({ user: userData, appData: newAppData }));
      setCarrinho([]);
      setStep('resumo');
    };

    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white p-4 pb-6 sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setScreen('home')} className="p-1 hover:bg-white/10 rounded-lg"><ArrowLeft size={22} /></button>
            <span className="text-2xl">🛍️</span>
            <h1 className="text-xl font-bold">Compra Fácil</h1>
            {tab === 'produtos' && carrinho.length > 0 && step === 'lista' && (
              <button onClick={() => setStep('carrinho')} className="ml-auto relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{carrinho.length}</span>
              </button>
            )}
          </div>
          <div className="flex gap-2 bg-white/10 rounded-lg p-1">
            <button onClick={() => { setTab('produtos'); setStep('lista'); }} className={`flex-1 py-2 rounded-lg text-sm font-bold ${tab === 'produtos' ? 'bg-white text-blue-700' : 'text-white'}`}>🛒 Produtos</button>
            <button onClick={() => setTab('pedidos')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${tab === 'pedidos' ? 'bg-white text-blue-700' : 'text-white'}`}>📦 Meus Pedidos</button>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          {tab === 'produtos' && step === 'lista' && (
            <>
              <div className="bg-white rounded-xl p-3 shadow-sm mb-4 flex items-center gap-2">
                <Search size={20} className="text-slate-400" />
                <input type="text" placeholder="O que você procura?" value={busca} onChange={(e) => setBusca(e.target.value)} className="flex-1 outline-none" />
                {busca && <button onClick={() => setBusca('')} className="text-slate-400">✕</button>}
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-3 mb-4 text-sm text-blue-900">
                💡 <strong>Dica:</strong> Use cartão virtual para mais segurança!
              </div>
              {produtosFiltrados.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <div className="text-5xl mb-2">🔍</div>
                  <p className="text-slate-600">Nenhum produto encontrado</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {produtosFiltrados.map(p => (
                    <div key={p.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-7xl">{p.emoji}</div>
                      <div className="p-3">
                        <div className="text-xs text-slate-500 mb-1">{p.categoria}</div>
                        <div className="font-bold text-sm mb-1 line-clamp-2 min-h-[2.5rem]">{p.nome}</div>
                        <div className="text-lg font-bold text-green-600 mb-2">R$ {p.preco.toFixed(2)}</div>
                        <button onClick={() => adicionar(p)} className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-1"><Plus size={16} /> Adicionar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {carrinho.length > 0 && (
                <button onClick={() => setStep('carrinho')} className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                  <ShoppingCart size={22} /> Carrinho ({carrinho.length}) - R$ {total.toFixed(2)}
                </button>
              )}
            </>
          )}

          {tab === 'produtos' && step === 'carrinho' && (
            <>
              <h2 className="text-xl font-bold mb-3">Carrinho ({carrinho.length})</h2>
              <div className="bg-white rounded-xl p-5 shadow-md mb-4">
                <div className="space-y-3 mb-4">
                  {carrinho.map(i => (
                    <div key={i.id} className="flex items-center gap-3 pb-3 border-b last:border-0">
                      <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-3xl">{i.emoji}</div>
                      <div className="flex-1"><div className="font-bold text-sm">{i.nome}</div><div className="text-xs text-slate-500">Qtd: {i.qtd}</div></div>
                      <div className="font-bold">R$ {(i.preco * i.qtd).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 pt-3 flex justify-between text-lg font-bold"><span>Total:</span><span className="text-green-600">R$ {total.toFixed(2)}</span></div>
              </div>
              <button onClick={() => setStep('pagamento')} className="w-full bg-green-500 text-white font-bold py-4 rounded-lg mb-2">Ir para Pagamento</button>
              <button onClick={() => setStep('lista')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Continuar Comprando</button>
            </>
          )}

          {tab === 'produtos' && step === 'pagamento' && (
            <>
              <h2 className="text-xl font-bold mb-3">Forma de Pagamento</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-3 mb-4 flex gap-2">
                <span className="text-2xl">💡</span>
                <div className="text-sm text-amber-900"><strong>Use cartão virtual!</strong> Vá em Bancos → Cartões e crie um.</div>
              </div>
              <div className="space-y-3 mb-4">
                <button onClick={() => { setPagamento('pix'); setStep('pix-pagamento'); }} className="w-full bg-white p-4 rounded-xl shadow-md hover:scale-105 flex items-center gap-3"><span className="text-3xl">💸</span><div className="text-left"><div className="font-bold">Pix</div><div className="text-xs text-slate-500">Pagamento instantâneo</div></div></button>
                <button onClick={() => { setPagamento('cartao'); setStep('cartao'); }} className="w-full bg-white p-4 rounded-xl shadow-md hover:scale-105 flex items-center gap-3"><span className="text-3xl">💳</span><div className="text-left"><div className="font-bold">Cartão (Físico ou Virtual)</div><div className="text-xs text-slate-500">Digite os dados</div></div></button>
              </div>
              <button onClick={() => setStep('carrinho')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </>
          )}

          {tab === 'produtos' && step === 'pix-pagamento' && (
            <>
              <h2 className="text-xl font-bold mb-3">Pagar com Pix</h2>
              <div className="bg-white rounded-xl p-6 shadow-md text-center mb-4">
                <p className="text-sm text-slate-600 mb-4">Abra seu app do banco e escaneie ou copie o código:</p>
                <div className="bg-white border-4 border-slate-800 inline-block p-4 rounded mb-4">
                  <div className="grid grid-cols-12 gap-0.5">
                    {[...Array(144)].map((_, i) => <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />)}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-2">R$ {total.toFixed(2)}</div>
                <div className="bg-slate-100 p-3 rounded-lg mb-3 text-xs font-mono break-all">00020126360014BR.GOV.BCB.PIX0114+5511999998888520400005303986540{total.toFixed(2).replace('.', '')}5802BR5925COMPRA FACIL LTDA6009SAO PAULO62070503***6304ABCD</div>
                <button onClick={() => { try { navigator.clipboard?.writeText('00020126360014BR.GOV.BCB.PIX...'); } catch(e){} setPixCopiado(true); }} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg mb-2 flex items-center justify-center gap-2"><Copy size={18}/> {pixCopiado ? '✓ Código Copiado!' : 'Copiar Código Pix'}</button>
              </div>
              <button onClick={finalizarCompra} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg mb-2">✓ Já Paguei</button>
              <button onClick={() => setStep('pagamento')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </>
          )}

          {tab === 'produtos' && step === 'cartao' && (
            <>
              <h2 className="text-xl font-bold mb-3">Dados do Cartão</h2>
              <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 mb-4 flex gap-3">
                <span className="text-3xl">📝</span>
                <div><div className="font-bold text-amber-900 mb-1">Não tem cartão virtual?</div><p className="text-sm text-amber-800">Vá em Bancos {'>'} Cartões e crie um. Anote os dados!</p></div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-md space-y-4 mb-4">
                <div><label className="text-sm font-bold mb-1 block">Número do Cartão</label><input type="text" placeholder="0000 0000 0000 0000" value={dadosCartao.numero} onChange={(e) => setDadosCartao({ ...dadosCartao, numero: e.target.value })} className="w-full p-3 border-2 rounded-lg" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-sm font-bold mb-1 block">Validade</label><input type="text" placeholder="MM/AA" value={dadosCartao.validade} onChange={(e) => setDadosCartao({ ...dadosCartao, validade: e.target.value })} className="w-full p-3 border-2 rounded-lg" /></div>
                  <div><label className="text-sm font-bold mb-1 block">CVV</label><input type="text" placeholder="000" value={dadosCartao.cvv} onChange={(e) => setDadosCartao({ ...dadosCartao, cvv: e.target.value })} className="w-full p-3 border-2 rounded-lg" /></div>
                </div>
              </div>
              <button onClick={finalizarCompra} disabled={!dadosCartao.numero || !dadosCartao.validade || !dadosCartao.cvv} className="w-full bg-green-500 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg mb-2">Pagar R$ {total.toFixed(2)}</button>
              <button onClick={() => setStep('pagamento')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </>
          )}

          {tab === 'produtos' && step === 'resumo' && (
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">🎉</div>
                <h2 className="text-2xl font-bold mb-2">Compra Confirmada!</h2>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Pedido:</span><span className="font-bold">PED-{Date.now().toString().slice(-6)}</span></div>
                <div className="flex justify-between"><span>Data:</span><span className="font-bold">{new Date().toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span>Pagamento:</span><span className="font-bold capitalize">{pagamento}</span></div>
                <div className="flex justify-between border-t-2 pt-2"><span className="font-bold">Total:</span><span className="font-bold text-green-600 text-lg">R$ {appData.pedidos[0]?.total.toFixed(2)}</span></div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-4">
                <div className="font-bold text-blue-900 mb-2">📦 Próximos passos</div>
                <p className="text-sm text-blue-800">Acompanhe seu pedido na aba "Meus Pedidos". Entrega em 3-5 dias úteis.</p>
              </div>
              <button onClick={() => { setTab('pedidos'); setStep('lista'); }} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg mb-2">Acompanhar Pedido</button>
              <button onClick={() => setStep('lista')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Continuar Comprando</button>
            </div>
          )}

          {tab === 'pedidos' && (
            <>
              {appData.pedidos.length === 0 ? (
                <div className="bg-white rounded-xl p-8 shadow-md text-center mt-4">
                  <div className="text-5xl mb-3">📦</div>
                  <p className="text-slate-600 mb-4">Nenhuma compra ainda</p>
                  <button onClick={() => { setTab('produtos'); setStep('lista'); }} className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg">Começar a Comprar</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appData.pedidos.map(p => (
                    <div key={p.id} className="bg-white rounded-xl p-5 shadow-md">
                      <div className="flex justify-between items-center mb-3">
                        <div><div className="font-bold text-sm">{p.id}</div><div className="text-xs text-slate-500">{p.data}</div></div>
                        <div className="text-right"><div className="font-bold text-green-600">R$ {p.total.toFixed(2)}</div><div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{p.status}</div></div>
                      </div>
                      <div className="text-xs text-slate-600 mb-3">{p.itens.length} {p.itens.length === 1 ? 'item' : 'itens'}</div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="font-bold text-xs mb-2">Rastreamento:</div>
                        <div className="space-y-1">
                          {p.rastreamento.map((r, i) => <div key={i} className={`text-xs ${i === 0 ? 'text-green-700 font-bold' : 'text-slate-500'}`}>{r}</div>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // ==================== INSS CIDADÃO DIGITAL ====================
  const TelaINSS = () => {
    const [step, setStep] = useState('menu');
    return (
      <div className="min-h-screen bg-slate-50 p-4 pb-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-cyan-700 to-cyan-600 text-white rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => step === 'menu' ? setScreen('home') : setStep('menu')} className="p-1 hover:bg-white/10 rounded-lg"><ArrowLeft size={22} /></button>
              <span className="text-2xl">🏛️</span>
              <h1 className="text-xl font-bold">INSS Cidadão Digital</h1>
            </div>
            <div className="bg-white/15 rounded-lg p-3 mt-3">
              <div className="text-xs opacity-90">Bem-vindo,</div>
              <div className="font-bold">{userData?.nome}</div>
              <div className="text-xs opacity-90">CPF: {userData?.cpf}</div>
            </div>
          </div>

          {step === 'menu' && (
            <>
              <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-r-xl p-4 mb-4 flex gap-3">
                <span className="text-3xl">🦉</span>
                <div><div className="font-bold text-cyan-900 text-sm">Atenção!</div><p className="text-xs text-cyan-800">O INSS nunca liga pedindo dados ou senhas. Cuidado com golpes!</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <BtnFunc icon="📜" label="Extrato CNIS" onClick={() => setStep('cnis')} />
                <BtnFunc icon="💰" label="Meus Pagamentos" onClick={() => setStep('pagamentos')} />
                <BtnFunc icon="📅" label="Tempo Contribuição" onClick={() => setStep('tempo')} />
                <BtnFunc icon="📋" label="Solicitar Benefício" onClick={() => setStep('beneficio')} />
                <BtnFunc icon="🔍" label="Consultar Pedido" onClick={() => setStep('pedido')} />
                <BtnFunc icon="📄" label="Comprovante Renda" onClick={() => setStep('comprovante')} />
              </div>
            </>
          )}

          {step === 'cnis' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Extrato CNIS</h2>
              <p className="text-sm text-slate-600 mb-4">Histórico de contribuições à Previdência</p>
              <div className="space-y-2 mb-4">
                {[
                  { ano: '2024', valor: 'R$ 1.412,00', empresa: 'Empresa XYZ Ltda' },
                  { ano: '2023', valor: 'R$ 1.320,00', empresa: 'Empresa XYZ Ltda' },
                  { ano: '2022', valor: 'R$ 1.250,00', empresa: 'Empresa ABC SA' },
                  { ano: '2021', valor: 'R$ 1.100,00', empresa: 'Empresa ABC SA' }
                ].map((c, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg flex justify-between">
                    <div><div className="font-bold text-sm">{c.empresa}</div><div className="text-xs text-slate-500">{c.ano}</div></div>
                    <div className="font-bold text-cyan-700">{c.valor}</div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg">📄 Baixar Extrato Completo</button>
            </div>
          )}

          {step === 'pagamentos' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Meus Pagamentos</h2>
              <div className="bg-cyan-50 p-4 rounded-lg mb-4">
                <div className="text-sm text-cyan-900">Próximo pagamento</div>
                <div className="text-2xl font-bold text-cyan-700">R$ 1.412,00</div>
                <div className="text-xs text-cyan-800">Em 02/05/2026</div>
              </div>
              <h3 className="font-bold mb-2 text-sm">Histórico</h3>
              <div className="space-y-2">
                {['Abril/2026', 'Março/2026', 'Fevereiro/2026', 'Janeiro/2026'].map((mes, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg flex justify-between">
                    <span className="text-sm">{mes}</span>
                    <span className="font-bold text-green-600">R$ 1.412,00 ✓</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'tempo' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Tempo de Contribuição</h2>
              <div className="bg-cyan-50 rounded-lg p-4 mb-4 text-center">
                <div className="text-4xl font-bold text-cyan-700">28 anos</div>
                <div className="text-sm text-cyan-800">e 7 meses contribuídos</div>
              </div>
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <div className="font-bold text-green-900 mb-1">✅ Você já pode se aposentar!</div>
                <p className="text-sm text-green-800">Procure uma agência ou solicite online.</p>
              </div>
            </div>
          )}

          {step === 'beneficio' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Solicitar Benefício</h2>
              <p className="text-sm text-slate-600 mb-4">Escolha o tipo de benefício que deseja solicitar</p>
              <div className="space-y-3">
                <button 
                  onClick={() => alert('📋 APOSENTADORIA POR IDADE\n\nRequisitos:\n• 62 anos (mulher)\n• 65 anos (homem)\n• 15 anos de contribuição\n\n✅ Você atende aos requisitos!\nClique para iniciar o processo.')} 
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold p-4 rounded-lg text-left flex justify-between items-center hover:scale-105 transition"
                >
                  <span>👵 Aposentadoria por Idade</span>
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => alert('💼 APOSENTADORIA POR TEMPO\n\nRequisitos:\n• 30 anos (mulher)\n• 35 anos (homem)\n\n✅ Você atende aos requisitos!\nClique para iniciar o processo.')} 
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold p-4 rounded-lg text-left flex justify-between items-center hover:scale-105 transition"
                >
                  <span>💼 Aposentadoria por Tempo</span>
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => alert('🏥 BENEFÍCIOS POR INCAPACIDADE\n\n• Auxílio Doença\n• Auxílio Incapacidade Temporária\n• Auxílio Reclusão\n\nClique para saber mais e iniciar o processo.')} 
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold p-4 rounded-lg text-left flex justify-between items-center hover:scale-105 transition"
                >
                  <span>🏥 Benefícios por Incapacidade</span>
                  <ChevronRight size={20} />
                </button>
              </div>
              <button onClick={() => setStep('menu')} className="w-full bg-slate-200 font-bold py-2 rounded-lg mt-4">Voltar</button>
            </div>
          )}

          {step === 'pedido' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Consultar Pedido</h2>
              <input type="text" placeholder="Número do protocolo" className="w-full p-3 border-2 rounded-lg mb-4" />
              <button className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg mb-4">Consultar</button>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="font-bold mb-2">Protocolo: 123456</div>
                <div className="text-sm">Status: <span className="text-green-600 font-bold">Em análise</span></div>
                <div className="text-xs text-slate-500 mt-1">Última atualização: 20/04/2026</div>
              </div>
            </div>
          )}

          {step === 'comprovante' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Comprovante de Renda</h2>
              <div className="bg-slate-50 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Beneficiário:</span><span className="font-bold">{userData?.nome}</span></div>
                <div className="flex justify-between"><span>CPF:</span><span className="font-bold">{userData?.cpf}</span></div>
                <div className="flex justify-between"><span>Benefício:</span><span className="font-bold">Aposentadoria</span></div>
                <div className="flex justify-between"><span>Valor:</span><span className="font-bold text-green-600">R$ 1.412,00</span></div>
                <div className="flex justify-between"><span>Início:</span><span className="font-bold">01/01/2024</span></div>
              </div>
              <button 
                onClick={() => {
                  alert('📄 Seu comprovante de renda foi gerado com sucesso!\n\nArquivo: Comprovante_Renda_2026.pdf\n\nVocê pode:\n• Baixar\n• Compartilhar\n• Enviar por email');
                  // Simular download
                  const element = document.createElement('a');
                  element.setAttribute('href', 'data:text/plain;charset=utf-8,COMPROVANTE DE RENDA - INSS\n\nTitular: ' + userData?.nome + '\nData: ' + new Date().toLocaleDateString() + '\nRenda Mensal: R$ 1.412,00\n\nComprovado pelo INSS');
                  element.setAttribute('download', 'Comprovante_Renda_' + new Date().getFullYear() + '.pdf');
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg"
              >
                📥 Baixar PDF
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==================== COMIDAJÁ ====================
  const TelaComida = () => {
    const [step, setStep] = useState('endereco');
    const [busca, setBusca] = useState('');
    const [restauranteSelec, setRestauranteSelec] = useState(null);
    const [carrinho, setCarrinho] = useState([]);
    const [endereco, setEndereco] = useState(userData?.endereco || '');
    const [pagamento, setPagamento] = useState(null);

    const restaurantes = [
      { id: 1, nome: 'Pizzaria Italiana', emoji: '🍕', tipo: 'Pizza', taxa: 5.99, tempo: '30-40 min', estrelas: 4.7 },
      { id: 2, nome: 'Hambúrguer Top', emoji: '🍔', tipo: 'Lanches', taxa: 6.99, tempo: '25-35 min', estrelas: 4.5 },
      { id: 3, nome: 'Sushi Express', emoji: '🍣', tipo: 'Japonesa', taxa: 8.99, tempo: '40-50 min', estrelas: 4.8 },
      { id: 4, nome: 'Cantinho Brasileiro', emoji: '🍛', tipo: 'Comida Caseira', taxa: 4.99, tempo: '30-40 min', estrelas: 4.6 },
      { id: 5, nome: 'Doceria Sabor', emoji: '🍰', tipo: 'Sobremesas', taxa: 3.99, tempo: '20-30 min', estrelas: 4.9 },
      { id: 6, nome: 'Açaí da Praça', emoji: '🍨', tipo: 'Açaí', taxa: 4.50, tempo: '15-25 min', estrelas: 4.8 }
    ];

    const cardapio = {
      1: [{ id: 1, nome: 'Pizza Margherita', preco: 49.90, emoji: '🍕' }, { id: 2, nome: 'Pizza Calabresa', preco: 54.90, emoji: '🍕' }, { id: 3, nome: 'Pizza 4 Queijos', preco: 59.90, emoji: '🍕' }],
      2: [{ id: 1, nome: 'X-Burger', preco: 24.90, emoji: '🍔' }, { id: 2, nome: 'X-Bacon', preco: 28.90, emoji: '🍔' }, { id: 3, nome: 'Batata Frita', preco: 15.90, emoji: '🍟' }],
      3: [{ id: 1, nome: 'Combo 20 peças', preco: 65.00, emoji: '🍣' }, { id: 2, nome: 'Hot Roll', preco: 35.00, emoji: '🍣' }, { id: 3, nome: 'Temaki', preco: 22.00, emoji: '🍣' }],
      4: [{ id: 1, nome: 'PF Bife com Fritas', preco: 28.90, emoji: '🍛' }, { id: 2, nome: 'PF Frango Grelhado', preco: 26.90, emoji: '🍗' }, { id: 3, nome: 'Feijoada', preco: 35.90, emoji: '🍲' }],
      5: [{ id: 1, nome: 'Bolo de Chocolate', preco: 18.90, emoji: '🍰' }, { id: 2, nome: 'Torta de Limão', preco: 22.90, emoji: '🥧' }, { id: 3, nome: 'Brigadeiro (12un)', preco: 24.90, emoji: '🍫' }],
      6: [{ id: 1, nome: 'Açaí 500ml', preco: 18.90, emoji: '🍨' }, { id: 2, nome: 'Açaí 700ml', preco: 24.90, emoji: '🍨' }, { id: 3, nome: 'Açaí com Granola', preco: 21.90, emoji: '🥣' }]
    };

    const restFiltrados = restaurantes.filter(r => r.nome.toLowerCase().includes(busca.toLowerCase()) || r.tipo.toLowerCase().includes(busca.toLowerCase()));
    const adicionar = (item) => { const ex = carrinho.find(i => i.id === item.id); if (ex) setCarrinho(carrinho.map(i => i.id === item.id ? {...i, qtd: i.qtd + 1} : i)); else setCarrinho([...carrinho, {...item, qtd: 1}]); };
    const total = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0);

    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        <div className="bg-gradient-to-br from-orange-600 to-orange-500 text-white p-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => { if (step === 'restaurante') setStep('menu'); else if (step === 'carrinho') setStep('restaurante'); else setScreen('home'); }} className="p-1 hover:bg-white/10 rounded-lg"><ArrowLeft size={22} /></button>
            <span className="text-2xl">🍔</span>
            <h1 className="text-xl font-bold">ComidaJá</h1>
            {step === 'restaurante' && carrinho.length > 0 && (
              <button onClick={() => setStep('carrinho')} className="ml-auto relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{carrinho.length}</span>
              </button>
            )}
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          {step === 'endereco' && (
            <div className="bg-white rounded-xl p-6 shadow-md mt-4">
              <h2 className="text-2xl font-bold mb-4">🍔 ComidaJá</h2>
              <p className="text-slate-600 mb-6">Aonde você quer receber sua comida?</p>
              <div>
                <label className="block text-sm font-bold mb-2">Endereço de Entrega</label>
                <input 
                  type="text" 
                  placeholder="Rua, número, bairro..." 
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full p-4 border-2 border-orange-300 rounded-lg text-lg mb-4"
                />
              </div>
              <button 
                onClick={() => {
                  const newAppData = { ...appData, enderecoComida: endereco };
                  setAppData(newAppData);
                  localStorage.setItem('appIdososV4', JSON.stringify({ user: userData, appData: newAppData }));
                  setStep('menu');
                }}
                disabled={!endereco}
                className="w-full bg-orange-500 disabled:bg-slate-300 text-white font-bold py-4 rounded-lg text-lg"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 'pagamento' && restauranteSelec && (
            <div className="bg-white rounded-xl p-6 shadow-md mt-4">
              <h2 className="text-2xl font-bold mb-4">Forma de Pagamento</h2>
              <p className="text-slate-600 mb-4">Total: <strong className="text-green-600 text-xl">R$ {(total + restauranteSelec.taxa).toFixed(2)}</strong></p>
              <div className="space-y-3 mb-6">
                {[
                  { id: 'dinheiro', icon: '💵', nome: 'Dinheiro', desc: 'Pagar com o entregador' },
                  { id: 'pix', icon: '💸', nome: 'Pix', desc: 'Pagamento instantâneo' },
                  { id: 'cartao', icon: '💳', nome: 'Cartão', desc: 'Débito ou Crédito' }
                ].map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setPagamento(p.id)} 
                    className={`w-full p-4 rounded-xl border-2 transition ${pagamento === p.id ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span>
                      <div className="text-left">
                        <div className="font-bold">{p.nome}</div>
                        <div className="text-xs text-slate-500">{p.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => {
                  alert(`✅ Pedido confirmado!\n\nRestaurante: ${restauranteSelec.nome}\nTotal: R$ ${(total + restauranteSelec.taxa).toFixed(2)}\nEntrega em: ${restauranteSelec.tempo}\nEndereço: ${endereco}\n\nPagamento: ${pagamento}\n\nSeu entregador chegará em breve!`);
                  setCarrinho([]);
                  setStep('menu');
                  setPagamento(null);
                }}
                disabled={!pagamento}
                className="w-full bg-orange-500 disabled:bg-slate-300 text-white font-bold py-4 rounded-lg text-lg mb-2"
              >
                Confirmar e Pedir
              </button>
              <button onClick={() => setStep('carrinho')} className="w-full bg-slate-200 text-slate-900 font-bold py-2 rounded-lg">
                Voltar
              </button>
            </div>
          )}

          {step === 'menu' && (
            <>
              <div className="bg-white rounded-xl p-3 shadow-sm mb-4 flex items-center gap-2">
                <Search size={20} className="text-slate-400" />
                <input type="text" placeholder="Buscar restaurantes" value={busca} onChange={(e) => setBusca(e.target.value)} className="flex-1 outline-none" />
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-3 mb-4 text-sm text-orange-900">
                💡 <strong>Dica:</strong> Confira sempre o tempo e taxa de entrega antes de pedir!
              </div>
              <h3 className="font-bold mb-3">Restaurantes</h3>
              <div className="space-y-3">
                {restFiltrados.map(r => (
                  <button key={r.id} onClick={() => { setRestauranteSelec(r); setStep('restaurante'); }} className="w-full bg-white rounded-xl p-4 shadow-md hover:scale-105 transition flex items-center gap-3">
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center text-4xl">{r.emoji}</div>
                    <div className="flex-1 text-left">
                      <div className="font-bold">{r.nome}</div>
                      <div className="text-xs text-slate-500 mb-1">{r.tipo}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" />{r.estrelas}</span>
                        <span>·</span>
                        <span>🕐 {r.tempo}</span>
                        <span>·</span>
                        <span>R$ {r.taxa.toFixed(2)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'restaurante' && restauranteSelec && (
            <>
              <div className="bg-white rounded-xl p-4 shadow-md mb-4 flex items-center gap-3">
                <div className="text-5xl">{restauranteSelec.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold">{restauranteSelec.nome}</div>
                  <div className="text-xs text-slate-500">{restauranteSelec.tipo} · ⭐ {restauranteSelec.estrelas}</div>
                  <div className="text-xs text-slate-500">🕐 {restauranteSelec.tempo} · Taxa R$ {restauranteSelec.taxa.toFixed(2)}</div>
                </div>
              </div>
              <h3 className="font-bold mb-3">Cardápio</h3>
              <div className="space-y-3">
                {cardapio[restauranteSelec.id].map(item => (
                  <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                    <div className="text-4xl">{item.emoji}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{item.nome}</div>
                      <div className="text-lg font-bold text-green-600">R$ {item.preco.toFixed(2)}</div>
                    </div>
                    <button onClick={() => adicionar(item)} className="bg-orange-500 text-white font-bold p-2 rounded-lg"><Plus size={20} /></button>
                  </div>
                ))}
              </div>
              {carrinho.length > 0 && (
                <button onClick={() => setStep('carrinho')} className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                  <ShoppingCart size={22} /> Carrinho ({carrinho.length}) - R$ {total.toFixed(2)}
                </button>
              )}
            </>
          )}

          {step === 'carrinho' && (
            <>
              <h2 className="text-xl font-bold mb-3">Seu Pedido</h2>
              <div className="bg-white rounded-xl p-5 shadow-md mb-4">
                <div className="space-y-3 mb-4">
                  {carrinho.map(i => (
                    <div key={i.id} className="flex items-center gap-3 pb-3 border-b last:border-0">
                      <div className="text-3xl">{i.emoji}</div>
                      <div className="flex-1"><div className="font-bold text-sm">{i.nome}</div><div className="text-xs">Qtd: {i.qtd}</div></div>
                      <div className="font-bold">R$ {(i.preco * i.qtd).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 pt-3 space-y-1">
                  <div className="flex justify-between text-sm"><span>Subtotal:</span><span>R$ {total.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span>Taxa entrega:</span><span>R$ {restauranteSelec.taxa.toFixed(2)}</span></div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total:</span><span className="text-green-600">R$ {(total + restauranteSelec.taxa).toFixed(2)}</span></div>
                </div>
              </div>
              <button onClick={() => setStep('pagamento')} className="w-full bg-orange-500 text-white font-bold py-4 rounded-lg">Escolher Pagamento</button>
            </>
          )}

          {step === 'confirmado' && (
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-6xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Pedido Confirmado!</h2>
              <p className="text-slate-600 mb-4">Seu pedido está sendo preparado</p>
              <div className="bg-orange-50 rounded-lg p-4 mb-4 space-y-2 text-sm">
                <div>📦 Pedido: #{Date.now().toString().slice(-6)}</div>
                <div>🏪 {restauranteSelec.nome}</div>
                <div>🕐 Chega em {restauranteSelec.tempo}</div>
                <div>💰 Total: R$ {(total + restauranteSelec.taxa).toFixed(2)}</div>
              </div>
              <button onClick={() => { setCarrinho([]); setStep('menu'); }} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg">Voltar ao Menu</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==================== SMS COM GOLPES ====================
  const TelaSMS = () => {
    const [smsAberto, setSmsAberto] = useState(null);
    const [linkClicado, setLinkClicado] = useState(false);

    const todasMensagens = [
      { id: 1, remetente: 'BANCO VERDE', titulo: 'Conta bloqueada', tempo: '10:32', preview: 'Sua conta foi bloqueada. Clique aqui para desbloquear...', golpe: true, tipoGolpe: 'phishing-banco', mensagemCompleta: 'Prezado cliente, identificamos uma transação suspeita em sua conta. Para sua segurança, sua conta foi BLOQUEADA. Clique no link abaixo IMEDIATAMENTE para desbloquear: bit.ly/banco-verde-desbloqueio. Caso não regularize em 24h, sua conta será encerrada.' },
      { id: 2, remetente: '+55 11 99999-1234', titulo: 'Mãe, é o Pedro', tempo: '09:15', preview: 'Mãe, mudei de número. Preciso de PIX urgente!', golpe: true, tipoGolpe: 'falso-parente', mensagemCompleta: 'Mãe, sou eu, Pedro! Mudei de número, salva esse novo. Tô precisando de uma ajuda urgente. Esqueci minha carteira e preciso pagar uma conta agora. Me manda R$ 800 por Pix nessa chave: pedro.silva@email.com. Te explico depois!' },
      { id: 3, remetente: 'INSS-GOV', titulo: 'Benefício liberado', tempo: '08:47', preview: 'Você tem R$ 5.480,00 a receber. Clique para resgatar...', golpe: true, tipoGolpe: 'falso-inss', mensagemCompleta: 'Sr(a) Cidadão, o Governo Federal liberou um benefício extraordinário em seu nome no valor de R$ 5.480,00. Para receber, acesse: inss-beneficios.gov.br.com e confirme seus dados bancários. Validade até hoje às 23:59h.' },
      { id: 4, remetente: 'OPERADORA', titulo: 'Sua fatura', tempo: 'Ontem', preview: 'Sua fatura no valor de R$ 89,90 vence amanhã.', golpe: false, mensagemCompleta: 'Olá! Sua fatura mensal no valor de R$ 89,90 vence em 25/04. Acesse o app oficial da operadora para pagar. Esta é uma mensagem informativa.' },
      { id: 5, remetente: 'SORTEIO PREMIADO', titulo: 'Você Ganhou!', tempo: 'Ontem', preview: '🎉 Parabéns! Você ganhou R$ 50.000! Clique aqui...', golpe: true, tipoGolpe: 'falso-premio', mensagemCompleta: '🎉🎉🎉 PARABÉNS!!! Você foi o(a) feliz ganhador(a) de R$ 50.000,00 no sorteio mensal! Para resgatar seu prêmio, clique aqui: premio-magico.com e pague apenas a TAXA DE LIBERAÇÃO de R$ 150,00 via Pix. Garanta JÁ seu prêmio!' }
    ];

    const mensagensVisiveis = todasMensagens.filter(m => !appData.smsApagadas.includes(m.id));
    const mensagemAberta = todasMensagens.find(m => m.id === smsAberto);

    const apagar = (id) => {
      saveDados(userData, { ...appData, smsApagadas: [...appData.smsApagadas, id] });
      setSmsAberto(null);
      setLinkClicado(false);
    };

    const marcarLida = (id) => {
      if (!appData.smsLidas.includes(id)) {
        saveDados(userData, { ...appData, smsLidas: [...appData.smsLidas, id] });
      }
    };

    if (smsAberto && mensagemAberta) {
      const m = mensagemAberta;
      
      // ✅ BUG 8: POPUP "VOCÊ CAIU NO GOLPE!"
      if (linkClicado && m.golpe) {
        return (
          <>
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <div className="bg-gradient-to-b from-red-600 to-red-700 text-white rounded-3xl p-8 max-w-sm text-center shadow-2xl animate-bounce">
                <div className="text-8xl mb-4 animate-pulse">⚠️</div>
                <h1 className="text-5xl font-black mb-4 leading-tight">VOCÊ CAIU NO GOLPE!</h1>
                <p className="text-2xl font-bold mb-6">
                  {m.tipoGolpe === 'phishing-banco' && '❌ NUNCA clique em links de SMS do banco!'}
                  {m.tipoGolpe === 'falso-parente' && '❌ SEMPRE ligue para confirmar!'}
                  {m.tipoGolpe === 'falso-inss' && '❌ INSS nunca envia SMS com links!'}
                  {m.tipoGolpe === 'falso-premio' && '❌ Ninguém ganha prêmio sem participar!'}
                </p>
                <div className="bg-white/20 rounded-2xl p-6 mb-6 border-4 border-white">
                  <p className="text-lg font-bold mb-2">✅ O QUE FAZER:</p>
                  <p className="text-sm leading-relaxed">
                    {m.tipoGolpe === 'phishing-banco' && 'Abra o app OFICIAL do seu banco. Bancos nunca pedem por SMS.'}
                    {m.tipoGolpe === 'falso-parente' && 'Ligue para seu parente usando o número antigo dele.'}
                    {m.tipoGolpe === 'falso-inss' && 'Use o app "Meu INSS" oficial ou ligue 135.'}
                    {m.tipoGolpe === 'falso-premio' && 'Ignore! Delete a mensagem imediatamente.'}
                  </p>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={() => setLinkClicado(false)} 
                    className="w-full bg-white text-red-600 font-black py-4 rounded-2xl text-xl hover:bg-slate-100 transition transform hover:scale-105"
                  >
                    ✓ ENTENDI!
                  </button>
                  <button 
                    onClick={() => { setSmsAberto(null); setLinkClicado(false); }} 
                    className="w-full bg-white/20 text-white font-bold py-3 rounded-2xl border-2 border-white hover:bg-white/30 transition"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      }

      return (
        <div className="min-h-screen bg-slate-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-4 pt-4">
              <button onClick={() => { setSmsAberto(null); setLinkClicado(false); }} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
              <h1 className="text-lg font-bold flex-1">{m.remetente}</h1>
              <button onClick={() => apagar(m.id)} className="p-2 hover:bg-red-100 rounded-lg text-red-600"><Trash2 size={22} /></button>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-md mb-4">
              <div className="text-xs text-slate-500 mb-2">{m.tempo}</div>
              <p className="text-sm leading-relaxed mb-4">{m.mensagemCompleta}</p>
              {m.golpe && (
                <button onClick={() => setLinkClicado(true)} className="text-blue-600 underline text-sm">[Clicar no link]</button>
              )}
            </div>

            {linkClicado && m.golpe && (
              <div className="bg-red-50 border-4 border-red-500 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="text-red-600" size={32} />
                  <h2 className="text-xl font-bold text-red-700">⚠️ ATENÇÃO! Isso é um GOLPE!</h2>
                </div>
                
                {m.tipoGolpe === 'phishing-banco' && (
                  <div className="text-sm text-red-900 space-y-2">
                    <p><strong>Tipo:</strong> Phishing Bancário</p>
                    <p>Bancos NUNCA enviam SMS com links pedindo para "desbloquear conta". Se sua conta tem problema, abra o app oficial do banco ou ligue diretamente para a central.</p>
                    <p><strong>Como se proteger:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Nunca clique em links de SMS</li>
                      <li>Acesse seu banco SOMENTE pelo app oficial</li>
                      <li>Em dúvida, ligue para o banco usando o número do cartão</li>
                    </ul>
                  </div>
                )}
                
                {m.tipoGolpe === 'falso-parente' && (
                  <div className="text-sm text-red-900 space-y-2">
                    <p><strong>Tipo:</strong> Golpe do Falso Parente</p>
                    <p>Golpistas se passam por filhos, netos ou parentes pedindo dinheiro urgente. Eles usam pressão emocional para você não pensar direito.</p>
                    <p><strong>Como se proteger:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>SEMPRE ligue para o número antigo do parente para confirmar</li>
                      <li>Combine uma "palavra-código" com a família para emergências</li>
                      <li>Desconfie de pedidos urgentes de dinheiro</li>
                    </ul>
                  </div>
                )}

                {m.tipoGolpe === 'falso-inss' && (
                  <div className="text-sm text-red-900 space-y-2">
                    <p><strong>Tipo:</strong> Golpe do Falso INSS</p>
                    <p>O INSS NUNCA envia SMS com links! Eles também não pedem para você "confirmar dados". Esse golpe rouba senhas para fazer empréstimos consignados em seu nome.</p>
                    <p><strong>Como se proteger:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Use APENAS o app oficial "Meu INSS"</li>
                      <li>Sites oficiais terminam em .gov.br (nunca .gov.br.com)</li>
                      <li>Em dúvida, ligue para 135 (telefone oficial)</li>
                    </ul>
                  </div>
                )}

                {m.tipoGolpe === 'falso-premio' && (
                  <div className="text-sm text-red-900 space-y-2">
                    <p><strong>Tipo:</strong> Golpe do Falso Prêmio</p>
                    <p>Você não pode ganhar um prêmio de um sorteio que não participou! E prêmio NUNCA pede pagamento de "taxa" para receber.</p>
                    <p><strong>Como se proteger:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Se parece bom demais, é golpe</li>
                      <li>Prêmios reais não cobram taxa</li>
                      <li>Ignore e apague a mensagem</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-4 flex gap-3">
              <span className="text-3xl">🛡️</span>
              <div>
                <div className="font-bold text-yellow-900 mb-1">Lição importante!</div>
                <p className="text-sm text-yellow-800">Mensagens suspeitas devem ser <strong>apagadas imediatamente</strong>. Não clique, não responda!</p>
              </div>
            </div>

            <button onClick={() => apagar(m.id)} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
              <Trash2 size={20} /> Apagar Mensagem
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4 pt-4">
            <button onClick={() => setScreen('home')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
            <span className="text-2xl">📱</span>
            <h1 className="text-2xl font-bold">Mensagens</h1>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-4 mb-4 flex gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <div className="font-bold text-yellow-900 mb-1">Cuidado com golpes!</div>
              <p className="text-sm text-yellow-800">Algumas mensagens aqui são <strong>golpes simulados</strong>. Aprenda a identificá-los!</p>
            </div>
          </div>

          {mensagensVisiveis.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-slate-600">Nenhuma mensagem</p>
            </div>
          ) : (
            <div className="space-y-2">
              {mensagensVisiveis.map(m => {
                const lida = appData.smsLidas.includes(m.id);
                return (
                  <button key={m.id} onClick={() => { setSmsAberto(m.id); marcarLida(m.id); }} className={`w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-left ${!lida ? 'border-l-4 border-blue-500' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className={`font-bold text-sm ${!lida ? 'text-slate-900' : 'text-slate-600'}`}>{m.remetente}</div>
                      <div className="text-xs text-slate-500">{m.tempo}</div>
                    </div>
                    <div className={`font-bold text-sm mb-1 ${!lida ? 'text-slate-900' : 'text-slate-600'}`}>{m.titulo}</div>
                    <div className="text-xs text-slate-500 line-clamp-2">{m.preview}</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==================== SEGURANÇA ====================
  const TelaSeguranca = () => (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6 pt-4">
          <button onClick={() => setScreen('home')} className="p-2 hover:bg-slate-200 rounded-lg"><ArrowLeft size={24} /></button>
          <h1 className="text-2xl font-bold">Segurança Digital</h1>
        </div>
        <div className="space-y-4">
          {[
            { icon: '🔐', titulo: 'Senhas Fortes', dicas: ['8+ caracteres', 'Misture letras, números e símbolos', 'Nunca use datas pessoais'] },
            { icon: '🔗', titulo: 'Links Suspeitos', dicas: ['Nunca clique em links de SMS', 'Bancos não pedem dados por link', 'Acesse sempre pelo app oficial'] },
            { icon: '📱', titulo: 'Golpes Comuns', dicas: ['Falso parente pedindo PIX', 'INSS oferecendo benefício', 'Conta bancária bloqueada', 'Você ganhou prêmio'] },
            { icon: '💳', titulo: 'Cartão Virtual', dicas: ['Ideal para sites desconhecidos', 'Anote os dados em papel', 'Tem limite e validade'] }
          ].map((d, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-500">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><span className="text-2xl">{d.icon}</span>{d.titulo}</h3>
              <ul className="space-y-2">
                {d.dicas.map((di, j) => <li key={j} className="text-sm text-slate-600 flex gap-2"><span className="text-green-600 font-bold">✓</span>{di}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== TRANSFERÊNCIA ====================
  const TelaTransferencia = ({ bancoId }) => {
    const banco = bancos[bancoId];
    const [step, setStep] = useState('dados');
    const [dados, setDados] = useState({ banco: '', agencia: '', conta: '', cpf: '', nome: 'Valentina', valor: '' });
    const corBg = bancoId === 'verde' ? 'bg-green-50' : bancoId === 'marrom' ? 'bg-amber-50' : 'bg-pink-50';
    const corBtn = bancoId === 'verde' ? 'bg-green-600' : bancoId === 'marrom' ? 'bg-amber-700' : 'bg-pink-600';

    return (
      <div className={`min-h-screen ${corBg} p-4`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6 pt-4">
            <button onClick={() => setScreen('dashboard')} className="p-2 hover:bg-white rounded-lg"><ArrowLeft size={24} /></button>
            <h1 className="text-2xl font-bold">Transferência</h1>
          </div>

          {step === 'dados' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Dados da Conta</h2>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Banco</label>
                  <select value={dados.banco} onChange={(e) => setDados({...dados, banco: e.target.value})} className="w-full p-3 border-2 rounded-lg">
                    <option value="">Selecione o banco</option>
                    <option>Banco Verde</option>
                    <option>Banco Marrom</option>
                    <option>Banco Rosa</option>
                    <option>Outro Banco</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Agência</label>
                  <input type="text" placeholder="0001" value={dados.agencia} onChange={(e) => setDados({...dados, agencia: e.target.value})} className="w-full p-3 border-2 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Conta</label>
                  <input type="text" placeholder="123456-7" value={dados.conta} onChange={(e) => setDados({...dados, conta: e.target.value})} className="w-full p-3 border-2 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">CPF do destinatário</label>
                  <input type="text" placeholder="123.456.789-00" value={dados.cpf} onChange={(e) => setDados({...dados, cpf: e.target.value})} className="w-full p-3 border-2 rounded-lg" />
                </div>
              </div>
              <button onClick={() => setStep('valor')} disabled={!dados.banco || !dados.agencia || !dados.conta || !dados.cpf} className={`w-full ${corBtn} disabled:bg-slate-300 text-white font-bold py-3 rounded-lg mb-2`}>Continuar</button>
              <button onClick={() => setScreen('dashboard')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Cancelar</button>
            </div>
          )}

          {step === 'valor' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Valor da Transferência</h2>
              <div className="bg-slate-50 p-3 rounded-lg mb-4 text-sm space-y-1">
                <div><strong>Para:</strong> Valentina</div>
                <div><strong>Banco:</strong> {dados.banco}</div>
                <div><strong>Conta:</strong> {dados.agencia} / {dados.conta}</div>
              </div>
              <input type="number" placeholder="0,00" value={dados.valor} onChange={(e) => setDados({...dados, valor: e.target.value})} className="w-full p-4 border-2 rounded-lg mb-4 text-2xl font-bold" />
              <button onClick={() => setStep('confirma')} disabled={!dados.valor} className={`w-full ${corBtn} disabled:bg-slate-300 text-white font-bold py-3 rounded-lg mb-2`}>Continuar</button>
              <button onClick={() => setStep('dados')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'confirma' && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Confirmar Transferência</h2>
              <div className="bg-slate-50 p-4 rounded-lg mb-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Para:</span><span className="font-bold">Valentina</span></div>
                <div className="flex justify-between"><span>CPF:</span><span className="font-bold">{dados.cpf}</span></div>
                <div className="flex justify-between"><span>Banco:</span><span className="font-bold">{dados.banco}</span></div>
                <div className="flex justify-between"><span>Agência/Conta:</span><span className="font-bold">{dados.agencia}/{dados.conta}</span></div>
                <div className="flex justify-between text-lg pt-2 border-t"><span>Valor:</span><span className="font-bold text-green-600">R$ {parseFloat(dados.valor || 0).toFixed(2)}</span></div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 p-3 rounded-lg mb-4 text-sm">⚠️ Confira tudo! Transferências não podem ser desfeitas.</div>
              <button onClick={() => setStep('sucesso')} className={`w-full ${corBtn} text-white font-bold py-3 rounded-lg mb-2`}>✓ Confirmar Transferência</button>
              <button onClick={() => setStep('valor')} className="w-full bg-slate-200 font-bold py-2 rounded-lg">Voltar</button>
            </div>
          )}

          {step === 'sucesso' && (
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="text-6xl mb-3">✅</div>
              <h2 className="text-2xl font-bold mb-2">Transferência Enviada!</h2>
              <div className={`bg-gradient-to-br ${banco.gradient} text-white rounded-xl p-5 my-4`}>
                <div className="text-xs opacity-90 mb-2">Comprovante - {banco.nome}</div>
                <div className="text-3xl font-bold mb-3">R$ {parseFloat(dados.valor || 0).toFixed(2)}</div>
                <div className="space-y-1 text-sm text-left">
                  <div className="flex justify-between"><span className="opacity-80">Para:</span><span className="font-bold">Valentina</span></div>
                  <div className="flex justify-between"><span className="opacity-80">Banco:</span><span className="font-bold">{dados.banco}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">Data:</span><span>{new Date().toLocaleDateString()}</span></div>
                </div>
              </div>
              <button onClick={() => setScreen('dashboard')} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"><Home size={20} /> Voltar à Tela Inicial</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==================== RENDER ====================
  const renderScreen = () => {
    if (!userData && screen !== 'cadastro') return <TelaInicial />;
    if (screen === 'cadastro') return <TelaCadastro />;
    if (screen === 'home') return <TelaInicial />;
    if (screen === 'bancos') return <TelaBancos />;
    if (screen === 'login') return <TelaLogin />;
    if (screen === 'dashboard') return <TelaDashboard />;
    if (screen === 'mobilidade') return <TelaMobilidade />;
    if (screen === 'loja') return <TelaLoja />;
    if (screen === 'inss') return <TelaINSS />;
    if (screen === 'comida') return <TelaComida />;
    if (screen === 'sms') return <TelaSMS />;
    if (screen === 'seguranca') return <TelaSeguranca />;
    if (screen === 'pix-verde') return <PixFluxoCompleto banco={bancos.verde} voltarPara="dashboard" corBg="bg-green-50" corBtn="bg-green-600" />;
    if (screen === 'pix-marrom') return <PixFluxoCompleto banco={bancos.marrom} voltarPara="dashboard" corBg="bg-amber-50" corBtn="bg-amber-700" />;
    if (screen === 'pix-rosa') return <PixFluxoCompleto banco={bancos.rosa} voltarPara="dashboard" corBg="bg-pink-50" corBtn="bg-pink-600" />;
    if (screen === 'transfer-rosa') return <TelaTransferencia bancoId="rosa" />;
    if (screen === 'cartoes-verde') return <TelaCartoes bancoId="verde" />;
    if (screen === 'cartoes-marrom') return <TelaCartoes bancoId="marrom" />;
    if (screen === 'cartoes-rosa') return <TelaCartoes bancoId="rosa" />;
    if (screen.startsWith('extrato-')) return <TelaExtrato bancoId={screen.split('-')[1]} />;
    if (screen.startsWith('pagar-')) return <TelaPagar bancoId={screen.split('-')[1]} />;
    if (screen === 'transfer-rosa') return <TelaTransferencia bancoId="rosa" />;
    return <TelaInicial />;
  };

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {renderScreen()}
    </div>
  );
}
