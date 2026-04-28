
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Check, Briefcase, Search, Users, Mail } from 'lucide-react';
import { useAuth } from '../src/components/AuthProvider';
import { auth, googleProvider, signInWithPopup, db, doc, updateDoc, setDoc, serverTimestamp } from '../src/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { OperationType, handleFirestoreError } from '../src/firebase';

export const EmployerAuth: React.FC<{ isSignup?: boolean }> = ({ isSignup = false }) => {
  const navigate = useNavigate();
  const { signIn: authSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create/Update user profile in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
            email: user.email,
            displayName: `${firstName} ${lastName}`,
            companyName,
            phone,
            selectedServices,
            role: 'employer',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }, { merge: true });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/employer/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await authSignIn();
      navigate('/employer/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://picsum.photos/seed/dam/1600/900" 
          alt="Dam Engineering" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/60 to-slate-50/80"></div>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-slate-100 relative z-10">
        <div className="text-center mb-8">
           <h1 className="text-2xl font-serif font-bold text-mosaic-dark">
             {isSignup ? 'Create Employer Account' : 'Employer Login'}
           </h1>
           <p className="text-slate-500 text-sm mt-2">
             {isSignup ? 'Sign up to view full pricing and access our recruiting platform.' : 'Welcome back. Log in to manage your jobs and pipeline.'}
           </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-3 py-6 border-slate-200 hover:bg-slate-50"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-500 font-bold tracking-widest">Or with email</span>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && (
            <>
              <div className="grid grid-cols-2 gap-4">
                 <input 
                    type="text" 
                    placeholder="First Name" 
                    required 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
                 />
                 <input 
                    type="text" 
                    placeholder="Last Name" 
                    required 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
                 />
              </div>
              <input 
                type="text" 
                placeholder="Company Name" 
                required 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
              />
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-4">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-3">I am interested in (Select all that apply):</label>
                <div className="space-y-3">
                    <div 
                        onClick={() => toggleService('posting')}
                        className={`flex items-center p-3 rounded cursor-pointer border transition-colors ${selectedServices.includes('posting') ? 'bg-white border-mosaic-teal shadow-sm' : 'border-transparent hover:bg-slate-100'}`}
                    >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${selectedServices.includes('posting') ? 'bg-mosaic-teal border-mosaic-teal text-white' : 'border-slate-300'}`}>
                            {selectedServices.includes('posting') && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-slate-700">Job Posting</span>
                        </div>
                    </div>
                    <div 
                        onClick={() => toggleService('sourcing')}
                        className={`flex items-center p-3 rounded cursor-pointer border transition-colors ${selectedServices.includes('sourcing') ? 'bg-white border-mosaic-teal shadow-sm' : 'border-transparent hover:bg-slate-100'}`}
                    >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${selectedServices.includes('sourcing') ? 'bg-mosaic-teal border-mosaic-teal text-white' : 'border-slate-300'}`}>
                             {selectedServices.includes('sourcing') && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-slate-700">Candidate Sourcing</span>
                        </div>
                    </div>
                    <div 
                        onClick={() => toggleService('recruiting')}
                        className={`flex items-center p-3 rounded cursor-pointer border transition-colors ${selectedServices.includes('recruiting') ? 'bg-white border-mosaic-teal shadow-sm' : 'border-transparent hover:bg-slate-100'}`}
                    >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${selectedServices.includes('recruiting') ? 'bg-mosaic-teal border-mosaic-teal text-white' : 'border-slate-300'}`}>
                             {selectedServices.includes('recruiting') && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-slate-700">Full-Cycle Recruiting</span>
                        </div>
                    </div>
                </div>
              </div>
            </>
          )}
          
          <input 
            type="email" 
            placeholder="Work Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-mosaic-teal focus:outline-none" 
          />
          
          <Button className="w-full" disabled={loading}>
             {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Sign In')}
          </Button>
        </form>
      </div>

        <div className="mt-6 text-center text-sm text-slate-500">
            {isSignup ? (
                <p>Already have an account? <Link to="/employer/login" className="text-mosaic-teal font-bold hover:underline">Log In</Link></p>
            ) : (
                <p>New to Mosaic? <Link to="/employer/signup" className="text-mosaic-teal font-bold hover:underline">Get 1 Free Job Post</Link></p>
            )}
        </div>

        {isSignup && (
            <div className="mt-8 p-4 bg-teal-50 rounded-lg">
                <h3 className="font-bold text-mosaic-teal text-sm mb-2">Why Join?</h3>
                <ul className="space-y-2">
                    <li className="flex items-center text-xs text-slate-600"><Check className="w-3 h-3 text-teal-600 mr-2"/> Access Exclusive Volume Pricing</li>
                    <li className="flex items-center text-xs text-slate-600"><Check className="w-3 h-3 text-teal-600 mr-2"/> First Job Post is 100% Free</li>
                    <li className="flex items-center text-xs text-slate-600"><Check className="w-3 h-3 text-teal-600 mr-2"/> Free Hiring Strategy Call</li>
                </ul>
            </div>
        )}
      </div>
    </div>
  );
};
